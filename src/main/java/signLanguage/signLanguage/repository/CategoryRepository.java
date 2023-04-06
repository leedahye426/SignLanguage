package signLanguage.signLanguage.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import signLanguage.signLanguage.model.Category;

import javax.persistence.EntityManager;
import java.util.List;
@Repository
@RequiredArgsConstructor
public class CategoryRepository {

    private final EntityManager em;
    public List<Category> findAll() {
        return em.createQuery("select c from category c", Category.class).getResultList();
    }
}
