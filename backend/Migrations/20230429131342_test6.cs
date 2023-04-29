using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class test6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PromptData_prompts_PromptId",
                table: "PromptData");

            migrationBuilder.AlterColumn<int>(
                name: "PromptId",
                table: "PromptData",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_PromptData_prompts_PromptId",
                table: "PromptData",
                column: "PromptId",
                principalTable: "prompts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PromptData_prompts_PromptId",
                table: "PromptData");

            migrationBuilder.AlterColumn<int>(
                name: "PromptId",
                table: "PromptData",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PromptData_prompts_PromptId",
                table: "PromptData",
                column: "PromptId",
                principalTable: "prompts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
