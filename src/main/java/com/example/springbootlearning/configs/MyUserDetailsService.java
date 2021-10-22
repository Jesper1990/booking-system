package com.example.springbootlearning.configs;

import com.example.springbootlearning.entities.User;
import com.example.springbootlearning.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;

@Configuration
public class MyUserDetailsService implements UserDetailsService {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public BCryptPasswordEncoder getEncoder() {
        return encoder;
    }

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    private void createDefaultUsers() {
        if (userRepository.findByUsername("user") == null) {
            addUser("user", "password");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with the name: " + username);
        }
        return toUserDetails(user);
    }

    public User addUser(String username, String password) {
        User user = new User(username, encoder.encode(password));
        try {
            return userRepository.save(user);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public UserDetails toUserDetails(User user) {
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles("USER").build();
    }
}
