using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Prompt1
    {
        [NotMapped]
        public static string prompt = ".tie5ronal";
        public Guid Id { get; set; }
        public User user { get; set; }

        [Column("H.period")]
        public int H_period { get; set; }

        [Column("DD.period.t")]
        public int DD_period_t { get; set; }

        [Column("DU.period.t")]
        public int DU_period_t { get; set; }

        [Column("H.t")]
        public int H_t { get; set; }

        [Column("DD.t.i")]
        public int DD_t_i { get; set; }

        [Column("DU.t.i")]
        public int DU_t_i { get; set; }

        [Column("H.i")]
        public int H_i { get; set; }

        [Column("DD.i.e")]
        public int DD_i_e { get; set; }

        [Column("DU.i.e")]
        public int DU_i_e { get; set; }

        [Column("H.e")]
        public int H_e { get; set; }

        [Column("DD.e.five")]
        public int DD_e_five { get; set; }

        [Column("DU.e.five")]
        public int DU_e_five { get; set; }

        [Column("H.five")]
        public int H_five { get; set; }

        [Column("DD.five.r")]
        public int DD_five_r { get; set; }

        [Column("DU.five.r")]
        public int DU_five_r { get; set; }

        [Column("H.r")]
        public int H_r { get; set; }

        [Column("DD.r.o")]
        public int DD_r_o { get; set; }

        [Column("DU.r.o")]
        public int DU_r_o { get; set; }

        [Column("H.o")]
        public int  H_o { get; set; }

        [Column("DD.o.n")]
        public int DD_o_n { get; set; }

        [Column("DU.o.n")]
        public int DU_o_n { get; set; }

        [Column("H.n")]
        public int H_n { get; set; }

        [Column("DD.n.a")]
        public int DD_n_a { get; set; }

        [Column("DU.n.a")]
        public int DU_n_a { get; set; }

        [Column("H.a")]
        public int H_a { get; set; }

        [Column("DD.a.l")]
        public int DD_a_l { get; set; }

        [Column("DU.a.l")]
        public int DU_a_l { get; set; }

        [Column("H.l")]
        public int H_l { get; set; }
    }
}
