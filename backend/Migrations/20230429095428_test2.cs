using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class test2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prompt1_Users_UserId",
                table: "Prompt1");

            migrationBuilder.DropForeignKey(
                name: "FK_Prompt1_prompts_PromptId",
                table: "Prompt1");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Prompt1",
                table: "Prompt1");

            migrationBuilder.RenameTable(
                name: "Prompt1",
                newName: "PromptData");

            migrationBuilder.RenameIndex(
                name: "IX_Prompt1_UserId",
                table: "PromptData",
                newName: "IX_PromptData_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Prompt1_PromptId",
                table: "PromptData",
                newName: "IX_PromptData_PromptId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PromptData",
                table: "PromptData",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PromptData_Users_UserId",
                table: "PromptData",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PromptData_prompts_PromptId",
                table: "PromptData",
                column: "PromptId",
                principalTable: "prompts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PromptData_Users_UserId",
                table: "PromptData");

            migrationBuilder.DropForeignKey(
                name: "FK_PromptData_prompts_PromptId",
                table: "PromptData");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PromptData",
                table: "PromptData");

            migrationBuilder.RenameTable(
                name: "PromptData",
                newName: "Prompt1");

            migrationBuilder.RenameIndex(
                name: "IX_PromptData_UserId",
                table: "Prompt1",
                newName: "IX_Prompt1_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_PromptData_PromptId",
                table: "Prompt1",
                newName: "IX_Prompt1_PromptId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Prompt1",
                table: "Prompt1",
                column: "Id");

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
    }
}
