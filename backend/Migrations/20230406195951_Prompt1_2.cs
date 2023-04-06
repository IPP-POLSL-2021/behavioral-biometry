using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Prompt1_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Prompt1",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    userId = table.Column<int>(type: "int", nullable: false),
                    Hperiod = table.Column<int>(name: "H.period", type: "int", nullable: false),
                    DDperiodt = table.Column<int>(name: "DD.period.t", type: "int", nullable: false),
                    DUperiodt = table.Column<int>(name: "DU.period.t", type: "int", nullable: false),
                    Ht = table.Column<int>(name: "H.t", type: "int", nullable: false),
                    DDti = table.Column<int>(name: "DD.t.i", type: "int", nullable: false),
                    DUti = table.Column<int>(name: "DU.t.i", type: "int", nullable: false),
                    Hi = table.Column<int>(name: "H.i", type: "int", nullable: false),
                    DDie = table.Column<int>(name: "DD.i.e", type: "int", nullable: false),
                    DUie = table.Column<int>(name: "DU.i.e", type: "int", nullable: false),
                    He = table.Column<int>(name: "H.e", type: "int", nullable: false),
                    DDefive = table.Column<int>(name: "DD.e.five", type: "int", nullable: false),
                    DUefive = table.Column<int>(name: "DU.e.five", type: "int", nullable: false),
                    Hfive = table.Column<int>(name: "H.five", type: "int", nullable: false),
                    DDfiver = table.Column<int>(name: "DD.five.r", type: "int", nullable: false),
                    DUfiver = table.Column<int>(name: "DU.five.r", type: "int", nullable: false),
                    Hr = table.Column<int>(name: "H.r", type: "int", nullable: false),
                    DDro = table.Column<int>(name: "DD.r.o", type: "int", nullable: false),
                    DUro = table.Column<int>(name: "DU.r.o", type: "int", nullable: false),
                    Ho = table.Column<int>(name: "H.o", type: "int", nullable: false),
                    DDon = table.Column<int>(name: "DD.o.n", type: "int", nullable: false),
                    DUon = table.Column<int>(name: "DU.o.n", type: "int", nullable: false),
                    Hn = table.Column<int>(name: "H.n", type: "int", nullable: false),
                    DDna = table.Column<int>(name: "DD.n.a", type: "int", nullable: false),
                    DUna = table.Column<int>(name: "DU.n.a", type: "int", nullable: false),
                    Ha = table.Column<int>(name: "H.a", type: "int", nullable: false),
                    DDal = table.Column<int>(name: "DD.a.l", type: "int", nullable: false),
                    DUal = table.Column<int>(name: "DU.a.l", type: "int", nullable: false),
                    Hl = table.Column<int>(name: "H.l", type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prompt1", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Prompt1_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Prompt1_userId",
                table: "Prompt1",
                column: "userId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Prompt1");
        }
    }
}
