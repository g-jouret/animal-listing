package alpha.networks.animallisting.animal;

import alpha.networks.animallisting.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/animal")
public class AnimalController {

  private final AnimalService animalService;

  public AnimalController(AnimalService animalService) {
    this.animalService = animalService;
  }

  @GetMapping("{id}")
  public ResponseEntity<Animal> getAnimal(@PathVariable long id) {
    return animalService.findById(id)
                        .map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("available")
  public ResponseEntity<List<Animal>> getAvailableAnimals() {
    List<Animal> animals = animalService.findAllWithoutOwner();
    if (animals.isEmpty()) return ResponseEntity.noContent().build();
    return ResponseEntity.ok(animals);
  }

  @GetMapping("{id}/owner")
  public ResponseEntity<User> getOwner(@PathVariable long id) {
    return animalService.findById(id)
                        .map(Animal::getOwner)
                        .map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("list")
  public ResponseEntity<List<Animal>> getAllAnimals(@RequestParam(required = false) String name) {
    List<Animal> animals = animalService.findAll(name);
    if (animals.isEmpty()) return ResponseEntity.noContent().build();
    return ResponseEntity.ok(animals);
  }

  @PostMapping
  public ResponseEntity<Animal> createAnimal(@RequestParam String name,
                                             @RequestParam AnimalType type) {
    return ResponseEntity.status(HttpStatus.CREATED).body(animalService.save(name, type));
  }

  @PostMapping("{id}")
  public ResponseEntity<Animal> updateAnimal(@PathVariable long id,
                                             @RequestParam(required = false) String name,
                                             @RequestParam(required = false) AnimalType type) {
    return animalService.update(id, name, type)
                        .map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("{id}")
  public ResponseEntity<HttpStatus> deleteAnimal(@PathVariable long id) {
    animalService.deleteById(id);
    return ResponseEntity.ok().build();
  }
}
