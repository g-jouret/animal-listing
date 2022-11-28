package alpha.networks.animallisting.user;

import alpha.networks.animallisting.animal.Animal;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false)
  private String name;
  @Column(nullable = false)
  private String firstName;

  @OneToMany(mappedBy = "owner")
  @JsonManagedReference
  private Set<Animal> pets;

  public User() {}

  public User(String name, String firstName) {
    this.name = name;
    this.firstName = firstName;
    pets = new HashSet<>();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public Set<Animal> getPets() {
    return pets;
  }

  public void setPets(Set<Animal> pets) {
    this.pets = pets;
  }

  public boolean addPet(Animal pet) {
    return pets.add(pet);
  }

  public boolean removePet(Animal pet) {
    return pets.remove(pet);
  }
}
