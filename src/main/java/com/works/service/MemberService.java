package com.works.service;

import com.works.entity.Member;
import com.works.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.io.FileNotFoundException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService{

    private final MemberRepository memberRepository;

    //id를 통해 해당 사용자의 정보를 가져옵니다.
    public Member findById(String userPk) {
       return memberRepository.findById(userPk).orElseThrow(EntityNotFoundException::new);
    }


 /*   public Member loginService(String id, String password) {
        return memberRepository.findByMember(id,password);
    }*/
}
