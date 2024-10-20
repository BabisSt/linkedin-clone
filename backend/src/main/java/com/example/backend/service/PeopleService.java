package com.example.backend.service;

import com.example.backend.dao.PeopleInterface;
import com.example.backend.model.People;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PeopleService {

    private PeopleInterface peopleInterface;

    public PeopleService(PeopleInterface peopleInterface) {
        this.peopleInterface = peopleInterface;
    }

    public List<People> getAllPeople() {
        return peopleInterface.getAllPeople();
    }
}
