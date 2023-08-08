package com.works.config.springSecurity;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 로그인 실패시 작동
@RequiredArgsConstructor
public class UserLoginFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException {
        // 로그인 실패 처리 로직
        // 실패 정보를 React 웹으로 보내는 작업을 수행한다.

        // 예를 들어, JSON 형태로 실패 정보를 생성하여 응답으로 보낼 수 있다.
        String message = "로그인에 실패하였습니다.";

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(message);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
