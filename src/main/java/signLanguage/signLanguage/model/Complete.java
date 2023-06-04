package signLanguage.signLanguage.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "complete")
@Table
@Getter @Setter
public class Complete {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "COMPLETE_SEQ")
    @SequenceGenerator(name = "COMPLETE_SEQ", sequenceName = "COMPLETE_SEQ", allocationSize = 1)
    private Long num;
    private Long memberId;
    private Long signId;
    private Long categoryId;


}
