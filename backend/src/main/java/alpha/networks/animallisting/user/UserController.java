package alpha.networks.animallisting.user;

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
@RequestMapping("/api/user")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("{id}")
  public ResponseEntity<User> getUser(@PathVariable long id) {
    return userService.findById(id)
                      .map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("list")
  public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String name,
                                                @RequestParam(required = false) String firstName) {
    List<User> users = userService.findAll(name, firstName);
    if (users.isEmpty()) return ResponseEntity.noContent().build();
    return ResponseEntity.ok(users);
  }

  @PostMapping
  public ResponseEntity<User> createUser(@RequestParam String name,
                                         @RequestParam String firstName) {
    return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(name, firstName));
  }

  @PostMapping("{id}")
  public ResponseEntity<User> updateUser(@PathVariable long id,
                                         @RequestParam(required = false) String name,
                                         @RequestParam(required = false) String firstName) {
    return userService.update(id, name, firstName)
                      .map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("{id}")
  public ResponseEntity<HttpStatus> deleteUser(@PathVariable long id) {
    userService.deleteById(id);
    return ResponseEntity.ok().build();
  }

  @PostMapping("{id}/pet")
  public ResponseEntity<User> addPet(@PathVariable long id,
                                     @RequestParam("id") long petId) {
    return userService.addPet(id, petId)
                      .map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("{id}/pet/{petId}")
  public ResponseEntity<User> removePet(@PathVariable long id,
                                        @PathVariable long petId) {
    return userService.removePet(id, petId)
                      .map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
  }
}
