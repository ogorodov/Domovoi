using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Domovoi.DAL.Migrations
{
    public partial class _201802111404_Remove_consumer_from_payment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Consumers_ConsumerId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_ConsumerId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "ConsumerId",
                table: "Payments");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ConsumerId",
                table: "Payments",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Payments_ConsumerId",
                table: "Payments",
                column: "ConsumerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Consumers_ConsumerId",
                table: "Payments",
                column: "ConsumerId",
                principalTable: "Consumers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
