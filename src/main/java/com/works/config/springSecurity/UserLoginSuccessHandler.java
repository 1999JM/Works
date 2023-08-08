package com.works.config.springSecurity;

import com.works.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;

//로그인 성공 핸들러
@RequiredArgsConstructor
public class UserLoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {


        Collection<? extends GrantedAuthority> authorities  = authentication.getAuthorities();
        String role = authorities.toString();

        //인증완료후 토큰을 새로 만들어줍니다.
        String jwtToken =  jwtTokenProvider.createToken(authentication.getName(),role);

        // 인증을 성공하면 토큰을 쿠키에 저장합니다.
        Cookie cookie = new Cookie("jwtToken", jwtToken);
        cookie.setHttpOnly(true); // HttpOnly 플래그 설정 (Javascript에서 접근 불가)
        cookie.setMaxAge(3600); // 토큰 유효 기간 설정 (예: 1시간)
        response.addCookie(cookie);

        //토큰을 헤더에 담아 넘겨줍니다.
        response.setHeader("Authorization",jwtToken);

    }
}
