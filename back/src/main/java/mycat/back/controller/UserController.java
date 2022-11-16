package mycat.back.controller;

import mycat.back.model.UserModel;
import mycat.back.repository.UserRepository;
import mycat.back.services.UserService;
import mycat.back.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private UserService userService;

  @Autowired
  private JwtUtils jwtUtils;

  @GetMapping("/user-widgets")
  public ArrayList<String> getUserWidgets(UserModel userModel, HttpServletRequest request) {
    String authorizationHeader = request.getHeader("Authorization");
    String username = null;
    String jwtToken = null;

    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      jwtToken = authorizationHeader.substring(7);
      username = jwtUtils.extractUsername(jwtToken);
    }

    return userService.getUserWidgets(username);

  }
}