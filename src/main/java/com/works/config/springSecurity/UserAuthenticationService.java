package com.works.config.springSecurity;

import com.works.entity.Member;
import com.works.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// 로그인 인증 처리 클래스(loadUserByUsername 메서드가 자동호출 )
@Service
@RequiredArgsConstructor
public class UserAuthenticationService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Member member = memberRepository.findMemberById(id);
        if(member == null){ // 회원이 존재하지 않는 경우
            throw new UsernameNotFoundException(id);
        }
        return User.builder()
                .username(member.getId())
                .password(member.getPassword())
                .roles(member.getRole().toString())
                .build();
    }
}
