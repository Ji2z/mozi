package com.sweet.mozi.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sweet.mozi.dto.Beverage;

public interface BeverageDao extends JpaRepository<Beverage, String> {
	Beverage findBeverageByNameAndType(String name, String type);
}
