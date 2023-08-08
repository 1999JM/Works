package com.works.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {

    //로그인
    @GetMapping(value = "/login")
    public String Login(){
        System.out.println("페이지 접근");
        return "redirect:http://localhost:3000/login";
    }

    //홈 페이지
    @GetMapping(value = "/")
    public String Home(){
        System.out.println("로그인 성공");
        return "redirect:http://localhost:3000";
    }

}
