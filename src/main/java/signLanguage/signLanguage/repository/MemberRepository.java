package signLanguage.signLanguage.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import signLanguage.signLanguage.model.Member;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberRepository  {
    private final EntityManager em;

    public Member findById(Long memberId) {
        System.out.println("findById()");
        return em.find(Member.class, memberId);
    }
    public List<Member> findAll() {
        return em.createQuery("select m from member m", Member.class).getResultList();
    }

}
