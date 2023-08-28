package com.works.config.springSecurity;

import com.works.config.jwt.JwtAuthenticationFilter;
import com.works.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;

    private final UserAuthenticationService userAuthenticationService;

    // authenticationManager를 Bean 등록합니다.
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        //서버에 인증정보를 저장하지 않기에 csrf를 사용하지 않는다.
        http.csrf().disable().cors();
        //httpBasic 방식 대신 Jwt를 사용하기에 비활성화 합니다.
        http.httpBasic().disable()
            .authorizeRequests()
            .antMatchers("/login").permitAll() // 로그인 페이지에 대해 모든 사용자가 접근 가능하도록 설정
            .antMatchers("/admin/**").hasRole("관리자") // 특정 url은 권한이 관리자일 경우만 접속 가능합니다.
            .anyRequest().authenticated() //그 외 페이지는 모두 인증이 필요합니다.
            .and()
            .formLogin().loginPage("/login") //로그인 페이지 설정
            .usernameParameter("id")//로그인 시 id를 파라미터로 받는다
            .successHandler(new UserLoginSuccessHandler(jwtTokenProvider))// 로그인 성공하면 가는 페이지 입니다.
            .failureHandler(new UserLoginFailureHandler()) // 로그인 실패 핸들러
            .and()
            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), // JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 전에 넣는다
                    UsernamePasswordAuthenticationFilter.class); // + 토큰에 저장된 유저정보를 활용하여야 하기 때문에 UserDetailService 클래스를 생성합니다.

        http.logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login")
                .invalidateHttpSession(true);

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        //Jwt를 사용하기 때문에 session을 stateless로 설정한다. stateless로 설정 시 Spring Security는 세션을 사용하지 않는다.
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userAuthenticationService).passwordEncoder(passwordEncoder());
    }
}
