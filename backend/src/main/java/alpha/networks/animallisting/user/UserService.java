package alpha.networks.animallisting.user;

import alpha.networks.animallisting.animal.Animal;
import alpha.networks.animallisting.animal.AnimalRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final AnimalRepository animalRepository;

  public UserService(UserRepository userRepository, AnimalRepository animalRepository) {
    this.userRepository = userRepository;
    this.animalRepository = animalRepository;
  }

  public Optional<User> findById(long id) {
    return userRepository.findById(id);
  }

  public List<User> findAll(String name, String firstName) {
    if (StringUtils.isAllBlank(name, firstName)) {
      return userRepository.findAll();
    }
    if (StringUtils.isBlank(firstName)) {
      return userRepository.findAllByName(name);
    }
    if (StringUtils.isBlank(name)) {
      return userRepository.findAllByFirstName(firstName);
    }
    return userRepository.findAllByNameAndFirstName(name, firstName);
  }

  public User save(String name, String firstName) {
    return userRepository.save(new User(name, firstName));
  }

  public Optional<User> update(long id, String name, String firstName) {
    return findById(id).map(user -> {
      if (StringUtils.isNotBlank(name)) user.setName(name);
      if (StringUtils.isNotBlank(firstName)) user.setFirstName(firstName);
      return userRepository.save(user);
    });
  }

  public void deleteById(long id) {
    findById(id).ifPresent(user -> {
      user.getPets().forEach(animal -> {
        animal.setOwner(null);
        animalRepository.save(animal);
      });
      userRepository.deleteById(id);
    });
  }

  public Optional<User> addPet(long id, long petId) {
    Animal animal = animalRepository.findById(petId).orElseThrow(() -> new IllegalArgumentException("This pet doesn't exist"));
    return userRepository.findById(id).map(user -> addPet(user, animal));
  }

  private User addPet(User user, Animal animal) {
    if (user.addPet(animal)) {
      animal.setOwner(user);
      animalRepository.save(animal);
      return userRepository.save(user);
    }
    return user;
  }

  public Optional<User> removePet(long id, long petId) {
    Animal animal = animalRepository.findById(petId).orElseThrow(() -> new IllegalArgumentException("This pet doesn't exist"));
    return userRepository.findById(id).map(user -> removePet(user, animal));
  }

  private User removePet(User user, Animal animal) {
    if (user.removePet(animal)) {
      animal.setOwner(null);
      animalRepository.save(animal);
      return userRepository.save(user);
    }
    return user;
  }
}
