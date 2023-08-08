package com.works.repository;

import com.works.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member,String> {
    Member findMemberById(String id);

/*    @Query("select * from Member where id = :id and password :password")
    Member findByMember(@Param("id") String id , @Param("password") String password);*/
}
