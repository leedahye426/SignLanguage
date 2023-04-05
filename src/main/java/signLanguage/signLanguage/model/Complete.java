package signLanguage.signLanguage.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "complete")
public class Complete {

    @Id
    @GeneratedValue
    private Long num;
    private Long memberId;
    private Long singId;

}
