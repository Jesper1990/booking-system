package com.example.springbootlearning.services;

import com.example.springbootlearning.configs.MyUserDetailsService;
import com.example.springbootlearning.entities.User;
import com.example.springbootlearning.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    public User findCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username);
    }

    public User registerUser(User user) {
        return myUserDetailsService.addUser(user.getUsername(), user.getPassword());
    }
}
