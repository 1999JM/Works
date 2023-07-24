package com.works.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.works.constant.MemberRole;
import com.works.constant.MemberStatus;
import com.works.entity.Member;
import com.works.entity.QMember;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@SpringBootTest
public class MemberTest {

    @Autowired
    JPAQueryFactory queryFactory;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Autowired
    MemberRepository memberRepository;

    @Test
    @DisplayName("사원 저장 테스트")
    public void createMemberTest(){

        //현재 날짜를 받아옵니다.
        LocalDate currentDate = LocalDate.now();

        // 년 추출
        int year = currentDate.getYear();

        // 월 추출 (1월이 1, 12월이 12를 반환합니다.)
        int month = currentDate.getMonthValue();

        // 일 추출
        int day = currentDate.getDayOfMonth();

        //현재 날짜를 기준으로 Member 데이터 베이스에 입사년월이 동일한 사람을 카운트 합니다.
        QMember qbean = QMember.member;
        Long count = queryFactory
                .select(qbean.count())
                .from(qbean)
                .where(qbean.dateOfEmployment.year().eq(year))
                .where(qbean.dateOfEmployment.month().eq(month))
                .where(qbean.dateOfEmployment.dayOfMonth().eq(day))
                .fetchOne();

        //현재 날짜를 패턴에 맞게 문자열로 변환시켜줍니다.
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        //숫자를 패턴에 맞게 문자열로 변환시켜줍니다.
        DecimalFormat newcnt = new DecimalFormat("00");

        String id = dateTimeFormatter.format(currentDate) + newcnt.format(count + 1);

        Member member = new Member();

        member.setId(id);
        member.setPassword(passwordEncoder().encode(id));
        member.setName("관리자");
        member.setDateOfEmployment(currentDate);
        member.setEmail("admin@naver.com");
        member.setPhoneNumber("01012345678");
        member.setAddress("마포구 서교동");
        member.setDepartment("EA팀");
        member.setPosition("사원");
        member.setMemberStatus(MemberStatus.재직중);
        member.setRole(MemberRole.관리자);

        memberRepository.save(member);
    }
}
