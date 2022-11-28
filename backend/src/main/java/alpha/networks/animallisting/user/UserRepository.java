package alpha.networks.animallisting.user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

  @Override
  List<User> findAll();
  List<User> findAllByFirstName(String firstName);
  List<User> findAllByName(String name);
  List<User> findAllByNameAndFirstName(String name, String firstName);
}
