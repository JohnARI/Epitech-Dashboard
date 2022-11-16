package mycat.back.controller;

import mycat.back.services.UserService;
import mycat.back.services.WidgetService;
import mycat.back.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/widget")
public class WidgetActiveController {

  @Autowired
  private WidgetService widgetService;

  @Autowired
  private UserService userService;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/user/{name}")
  private String addWidgetToUser(HttpServletRequest request, @PathVariable String name) {
    String authorizationHeader = request.getHeader("Authorization");
    String username = null;
    String jwtToken = null;

    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      jwtToken = authorizationHeader.substring(7);
      username = jwtUtils.extractUsername(jwtToken);
    }
    if (!userService.userHasWidget(username, name)) {
      return widgetService.addWidgetToUser(username, name);
    }
    System.out.println("User already has this widget");
    return null;
  }

  @DeleteMapping("/{name}/delete")
  private void deleteWidgetFromUser(HttpServletRequest request, @PathVariable String name) {
    String authorizationHeader = request.getHeader("Authorization");
    String username = null;
    String jwtToken = null;

    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      jwtToken = authorizationHeader.substring(7);
      username = jwtUtils.extractUsername(jwtToken);
    }

    widgetService.removeWidgetFromUser(username, name);
  }




}