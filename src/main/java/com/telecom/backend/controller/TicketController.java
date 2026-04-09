package com.telecom.backend.controller;

import com.telecom.backend.model.Ticket;
import com.telecom.backend.repository.TicketRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    private final TicketRepository repo;

    public TicketController(TicketRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Ticket> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Ticket create(@RequestBody Ticket ticket) {
        if (ticket.getStatus() == null) {
            ticket.setStatus("OPEN");   // 🔥 FORCE FIX
        }
        return repo.save(ticket);
    }

    @PutMapping("/{id}")
    public Ticket resolve(@PathVariable Long id) {
        Ticket t = repo.findById(id).orElseThrow();
        t.setStatus("RESOLVED");
        return repo.save(t);
    }
}