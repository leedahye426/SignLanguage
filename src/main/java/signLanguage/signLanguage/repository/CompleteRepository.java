package signLanguage.signLanguage.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import signLanguage.signLanguage.model.Complete;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CompleteRepository {

    private final EntityManager em;

    @Transactional
    public Long save(Complete complete) {
        em.persist(complete);
        return complete.getNum();
    }

    public List<Complete> findComplete(Long categoryId, Long memberId) {
        return em.createQuery("select c from complete c where c.categoryId = :categoryId and c.memberId= :memberId")
                .setParameter("categoryId", categoryId)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    public Complete checkDuplicate(Long memberId, Long signId) {
        return (Complete) em.createQuery("select c from complete c where c.signId= :signId and c.memberId= : memberId")
                .setParameter("signId", signId)
                .setParameter("memberId", memberId)
                .getSingleResult();
    }
}
