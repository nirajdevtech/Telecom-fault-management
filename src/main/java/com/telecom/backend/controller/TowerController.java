package com.telecom.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/towers")
@CrossOrigin(origins = "*")
public class TowerController {

    @GetMapping
    public List<Map<String, Object>> getTowers() {

        List<Map<String, Object>> towers = new ArrayList<>();

        Map<String, Object> t1 = new HashMap<>();
        t1.put("id", 1);
        t1.put("name", "Tower A");
        t1.put("signal", -70);
        t1.put("status", "ACTIVE");

        Map<String, Object> t2 = new HashMap<>();
        t2.put("id", 2);
        t2.put("name", "Tower B");
        t2.put("signal", -95);
        t2.put("status", "FAULT");

        Map<String, Object> t3 = new HashMap<>();
        t3.put("id", 3);
        t3.put("name", "Tower C");
        t3.put("signal", -60);
        t3.put("status", "ACTIVE");

        towers.add(t1);
        towers.add(t2);
        towers.add(t3);

        return towers;
    }
}