package mycat.back.services;

import mycat.back.model.UserModel;
import mycat.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

  @Autowired
  UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserModel foundedUser = userRepository.findByUsername(username);
    if (foundedUser == null) return null;

    String name = foundedUser.getUsername();
    String pwd = foundedUser.getPassword();

    return new User(name, pwd, new ArrayList<>());
  }

  public UserModel getUserByUsername(String username) {
    return userRepository.findByUsername(username);
  }

public ArrayList<String> getUserWidgets(String username) {
    UserModel userModel = userRepository.findByUsername(username);
    if (userModel != null) {
      return userModel.getWidgets();
    }
    return null;
  }
  public boolean userHasWidget(String username, String widgetName) {
    UserModel userModel = userRepository.findByUsername(username);
    if (userModel != null) {
      return userModel.getWidgets().contains(widgetName);
    }
    return false;
  }
}