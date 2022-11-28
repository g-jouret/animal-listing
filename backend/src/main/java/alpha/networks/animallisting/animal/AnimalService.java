package alpha.networks.animallisting.animal;

import alpha.networks.animallisting.user.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {

  private final UserService userService;
  private final AnimalRepository animalRepository;

  public AnimalService(UserService userService, AnimalRepository animalRepository) {
    this.userService = userService;
    this.animalRepository = animalRepository;
  }

  public Optional<Animal> findById(long id) {
    return animalRepository.findById(id);
  }

  public List<Animal> findAll(String name) {
    if (StringUtils.isBlank(name)) {
      return animalRepository.findAll();
    }
    return animalRepository.findAllByName(name);
  }

  public List<Animal> findAllWithoutOwner() {
    return animalRepository.findAllByOwnerIsNull();
  }

  public Animal save(String name, AnimalType type) {
    return animalRepository.save(new Animal(name, type));
  }

  public Optional<Animal> update(long id, String name, AnimalType type) {
    return findById(id).map(animal -> {
      if (StringUtils.isNotBlank(name)) animal.setName(name);
      if (type != null) animal.setType(type);
      return animalRepository.save(animal);
    });
  }

  public void deleteById(long id) {
    findById(id).ifPresent(animal -> {
      if (animal.getOwner() != null) userService.removePet(animal.getOwner().getId(), id);
      animalRepository.deleteById(id);
    });
  }
}
