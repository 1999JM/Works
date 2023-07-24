package com.works.entity;

import com.works.constant.MemberRole;
import com.works.constant.MemberStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Members")
@Getter@Setter@ToString
public class Member {

    @Id
    @Column(unique = true)                  // unique = true 해당 값은 유니크한 값이 들어간다. 중복 x
    private String id;                      //사원번호

    @Column(nullable = false)
    private String name;                    // 이름

    @Column(nullable = false)
    private String password;                //비밀번호

    @Column(nullable = false, unique = true)
    private String email;                   // 이메일

    @Column(nullable = false, unique = true)
    private String phoneNumber;             // 핸드폰 번호

    @Column(nullable = false)
    private String address;                 // 주소

    @Column(nullable = false)
    private LocalDate dateOfEmployment;     // 입사 날짜

    @Column(nullable = false)
    private String department;              // 부서

    @Column(nullable = false)
    private String position;                // 직위

    @Enumerated(EnumType.STRING)
    private MemberStatus memberStatus;      //재직 여부

    @Enumerated(EnumType.STRING)
    private MemberRole role;                //관리자 여부
}
