package mycat.back.services;

import mycat.back.model.UserModel;
import mycat.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WidgetService {

  @Autowired
  UserRepository userRepository;

public void removeWidgetFromUser(String username, String widgetName) {
    UserModel userModel = userRepository.findByUsername(username);
    if (userModel != null) {
      userModel.getWidgets().remove(widgetName);
      userRepository.save(userModel);
    }
  }

  public String addWidgetToUser(String username, String name) {
    UserModel userModel = userRepository.findByUsername(username);
    if (userModel != null) {
      userModel.getWidgets().add(name);
      userRepository.save(userModel);
      return name;
    }
    return null;
  }
}
