using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class test4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FixedPromptId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Users_FixedPromptId",
                table: "Users",
                column: "FixedPromptId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_prompts_FixedPromptId",
                table: "Users",
                column: "FixedPromptId",
                principalTable: "prompts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_prompts_FixedPromptId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_FixedPromptId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FixedPromptId",
                table: "Users");
        }
    }
}
