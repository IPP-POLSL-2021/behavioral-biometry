using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Prompt1",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    prompt = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    H_k1 = table.Column<int>(type: "int", nullable: false),
                    DD_k1_k2 = table.Column<int>(type: "int", nullable: false),
                    DU_k1_k2 = table.Column<int>(type: "int", nullable: false),
                    H_k2 = table.Column<int>(type: "int", nullable: false),
                    DD_k2_k3 = table.Column<int>(type: "int", nullable: false),
                    DU_k2_k3 = table.Column<int>(type: "int", nullable: false),
                    H_k3 = table.Column<int>(type: "int", nullable: false),
                    DD_k3_k4 = table.Column<int>(type: "int", nullable: false),
                    DU_k3_k4 = table.Column<int>(type: "int", nullable: false),
                    H_k4 = table.Column<int>(type: "int", nullable: false),
                    DD_k4_k5 = table.Column<int>(type: "int", nullable: false),
                    DU_k4_k5 = table.Column<int>(type: "int", nullable: false),
                    H_k5 = table.Column<int>(type: "int", nullable: false),
                    DD_k5_k6 = table.Column<int>(type: "int", nullable: false),
                    DU_k5_k6 = table.Column<int>(type: "int", nullable: false),
                    H_k6 = table.Column<int>(type: "int", nullable: false),
                    DD_k6_k7 = table.Column<int>(type: "int", nullable: false),
                    DU_k6_k7 = table.Column<int>(type: "int", nullable: false),
                    H_k7 = table.Column<int>(type: "int", nullable: false),
                    DD_k7_k8 = table.Column<int>(type: "int", nullable: false),
                    DU_k7_k8 = table.Column<int>(type: "int", nullable: false),
                    H_k8 = table.Column<int>(type: "int", nullable: false),
                    DD_k8_k9 = table.Column<int>(type: "int", nullable: false),
                    DU_k8_k9 = table.Column<int>(type: "int", nullable: false),
                    H_k9 = table.Column<int>(type: "int", nullable: false),
                    DD_k9_k10 = table.Column<int>(type: "int", nullable: false),
                    DU_k9_k10 = table.Column<int>(type: "int", nullable: false),
                    H_k10 = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prompt1", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "testModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<int>(type: "int", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_testModel", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "accessTokens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CreationDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ExpirationDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    userId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_accessTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_accessTokens_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_accessTokens_userId",
                table: "accessTokens",
                column: "userId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "accessTokens");

            migrationBuilder.DropTable(
                name: "Prompt1");

            migrationBuilder.DropTable(
                name: "testModel");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
