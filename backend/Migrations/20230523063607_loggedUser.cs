using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class loggedUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Results_userId",
                table: "Results",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Users_userId",
                table: "Results",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Users_userId",
                table: "Results");

            migrationBuilder.DropIndex(
                name: "IX_Results_userId",
                table: "Results");
        }
    }
}
