package com.BookCollectionManager.controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
public class BookController {
    @GetMapping
    public List<Map<String, Object>> list() {
        return List.of(
            Map.of("id", 1, "title", "Clean Code", "author", "Robert C. Martin"),
            Map.of("id", 2, "title", "Effective Java", "author", "Joshua Bloch")
        );
    }
}