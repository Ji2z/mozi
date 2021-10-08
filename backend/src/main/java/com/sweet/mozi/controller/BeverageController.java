package com.sweet.mozi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sweet.mozi.dao.BeverageDao;
import com.sweet.mozi.dto.Beverage;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/beverage")
@CrossOrigin("*")
public class BeverageController {
	@Autowired
	BeverageDao beverageDao;
	
	@GetMapping("/search")
	@ApiOperation(value = "음료수 상세보기")
	public ResponseEntity<Beverage> search(@RequestParam("name") String name, @RequestParam("type") String type) {
		Beverage beverage = beverageDao.findBeverageByNameAndType(name, type);
		if (beverage == null) return new ResponseEntity<Beverage>(beverage, HttpStatus.NO_CONTENT); 
		return new ResponseEntity<Beverage>(beverage, HttpStatus.OK);
	}
} 
