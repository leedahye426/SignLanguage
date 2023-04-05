package signLanguage.signLanguage.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import signLanguage.signLanguage.model.Sign;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class SignRepository {
    private final EntityManager em;

    public Sign findById(Long signId) {
        return em.find(Sign.class, signId);
    }
    public List<Sign> findAll() {
        return em.createQuery("select s from sign s", Sign.class).getResultList();
    }

    public List<Sign> findRandomSigns(int limit) {
        return em.createQuery("select s from sign s" +
                        "order by random()", Sign.class)
                .setMaxResults(limit)
                .getResultList();
    }
}
