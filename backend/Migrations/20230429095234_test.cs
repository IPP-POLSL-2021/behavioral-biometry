using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "prompt",
                table: "Prompt1");

            migrationBuilder.AddColumn<int>(
                name: "PromptId",
                table: "Prompt1",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Prompt1",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "prompts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_prompts", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Prompt1_PromptId",
                table: "Prompt1",
                column: "PromptId");

            migrationBuilder.CreateIndex(
                name: "IX_Prompt1_UserId",
                table: "Prompt1",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prompt1_Users_UserId",
                table: "Prompt1",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Prompt1_prompts_PromptId",
                table: "Prompt1",
                column: "PromptId",
                principalTable: "prompts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prompt1_Users_UserId",
                table: "Prompt1");

            migrationBuilder.DropForeignKey(
                name: "FK_Prompt1_prompts_PromptId",
                table: "Prompt1");

            migrationBuilder.DropTable(
                name: "prompts");

            migrationBuilder.DropIndex(
                name: "IX_Prompt1_PromptId",
                table: "Prompt1");

            migrationBuilder.DropIndex(
                name: "IX_Prompt1_UserId",
                table: "Prompt1");

            migrationBuilder.DropColumn(
                name: "PromptId",
                table: "Prompt1");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Prompt1");

            migrationBuilder.AddColumn<string>(
                name: "prompt",
                table: "Prompt1",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
