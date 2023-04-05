package signLanguage.signLanguage.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sign")
public class Sign {

    @Id//기본키 지정
    @GeneratedValue
    private Long singId;
    private Long categoryId;
    private String word;
    private String savedName;
    private String savedPath;

}
