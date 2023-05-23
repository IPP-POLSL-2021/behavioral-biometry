using backend.Models;

namespace backend.DTO
{
    public class PromptDataDto
    {
        public string Prompt { get; set; } = null!;
        public int? loggedUserId { get; set; }
        public int H_k1 { get; set; }
        public int DD_k1_k2 { get; set; }
        public int DU_k1_k2 { get; set; }

        public int H_k2 { get; set; }

        public int DD_k2_k3 { get; set; }

        public int DU_k2_k3 { get; set; }
        public int H_k3 { get; set; }
        public int DD_k3_k4 { get; set; }

        public int DU_k3_k4 { get; set; }

        public int H_k4 { get; set; }

        public int DD_k4_k5 { get; set; }

        public int DU_k4_k5 { get; set; }

        public int H_k5 { get; set; }

        public int DD_k5_k6 { get; set; }

        public int DU_k5_k6 { get; set; }

        public int H_k6 { get; set; }

        public int DD_k6_k7 { get; set; }

        public int DU_k6_k7 { get; set; }

        public int H_k7 { get; set; }

        public int DD_k7_k8 { get; set; }

        public int DU_k7_k8 { get; set; }

        public int H_k8 { get; set; }

        public int DD_k8_k9 { get; set; }

        public int DU_k8_k9 { get; set; }

        public int H_k9 { get; set; }

        public int DD_k9_k10 { get; set; }

        public int DU_k9_k10 { get; set; }

        public int H_k10 { get; set; }
    }
}
