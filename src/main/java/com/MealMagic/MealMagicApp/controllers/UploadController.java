package com.MealMagic.MealMagicApp.controllers;

import com.MealMagic.MealMagicApp.model.User;
import com.MealMagic.MealMagicApp.model.UserDetails;
import com.MealMagic.MealMagicApp.repositories.UserDetailsRepository;
import com.MealMagic.MealMagicApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Controller
@RequestMapping("/rest/upload")
public class UploadController {
    @Autowired
    private UserDetailsRepository userDetailsRepository;
    @Autowired
    private UserRepository userRepository;
    public static final String UPLOAD_DIRECTORY = "uploads";

    @PostMapping("/avatar")
    public ResponseEntity<String> uploadAvatar(@RequestParam("file") MultipartFile file, @RequestParam("userId") long userId) throws IOException {
        try {
            System.out.println("Received userId: " + userId);
            Path uploadPath = Paths.get(UPLOAD_DIRECTORY);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            if (file.isEmpty() || !isImage(file)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file type or file is empty.");
            }

            String uniqueFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path fileNameAndPath = uploadPath.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), fileNameAndPath);

            String pathWithForwardSlashes = fileNameAndPath.toString().replace("\\", "/");

            Optional<UserDetails> userDetailsOptional = userDetailsRepository.findById(userId);
            UserDetails userDetails;
            if (userDetailsOptional.isPresent()) {
                userDetails = userDetailsOptional.get();
            } else {
                userDetails = new UserDetails();
                User user = userRepository.findById(userId).orElse(null);
                if (user == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with ID " + userId + " not found.");
                }
                userDetails.setUser(user);
                System.out.println("Created new UserDetails for user with ID " + userId);
            }

            userDetails.setAvatarPath(pathWithForwardSlashes);
            userDetailsRepository.save(userDetails);
            System.out.println("Avatar path saved to the database: " + fileNameAndPath.toString());

            return ResponseEntity.ok("File uploaded successfully: " + uniqueFileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not upload the file: " + e.getMessage());
        }
    }

    @GetMapping("/avatarPath")
    public ResponseEntity<String> getUserAvatarPath(@RequestParam("userId") long userId) {
        Optional<UserDetails> userDetailsOptional = userDetailsRepository.findById(userId);
        if (userDetailsOptional.isPresent()) {
            UserDetails userDetails = userDetailsOptional.get();
            String avatarPath = userDetails.getAvatarPath();
            return ResponseEntity.ok(avatarPath);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private boolean isImage(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType.equals("image/png") || contentType.equals("image/jpeg") || contentType.equals("image/jpg");
    }
}
