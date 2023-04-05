package signLanguage.signLanguage.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "board")
public class Board {

    @Id
    @GeneratedValue
    private Long postId;
    private Long memberId;
    private String title;
    @Lob
    private String content;
    private LocalDateTime uploadDate;
    private LocalDateTime modifyDate;

//    @ManyToOne
//    @JoinColumn(name="email")
//    private Member member;
}
