package alpha.networks.animallisting;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

  @RequestMapping({"/", "/user/**", "/animal/**", "/error"})
  public String forwardToIndex() {
    return "forward:/index.html";
  }
}
