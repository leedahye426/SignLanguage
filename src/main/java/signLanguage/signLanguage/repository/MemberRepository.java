package signLanguage.signLanguage.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import signLanguage.signLanguage.model.Member;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberRepository  {
    private final EntityManager em;

    public Member save(Member member) {
        em.persist(member);
        return member;
    }

    public Member findByEmail(String email) {
        return em.find(Member.class, email);
    }
    public Member findById(Long memberId) {
        return em.find(Member.class, memberId);
    }
    public List<Member> findAll() {
        return em.createQuery("select m from member m", Member.class).getResultList();
    }

    public Optional<Object> loginCheck(String email, String passwd) {
        return (Optional<Object>) em.createQuery("select m from member m" +
                "where m.email = :email and m.passwd = :passwd")
                .setParameter("email", email)
                .setParameter("passwd", passwd)
                .getSingleResult();
    }
}
