using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Domovoi.DAL.Migrations
{
    public partial class Change_relation_in_Invoice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrganisationId",
                table: "Invoices",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_OrganisationId_HousingObjectId",
                table: "Invoices",
                columns: new[] { "OrganisationId", "HousingObjectId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_OrganizationHousingObjects_OrganisationId_HousingObjectId",
                table: "Invoices",
                columns: new[] { "OrganisationId", "HousingObjectId" },
                principalTable: "OrganizationHousingObjects",
                principalColumns: new[] { "OrganisationId", "HousingObjectId" },
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_OrganizationHousingObjects_OrganisationId_HousingObjectId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_OrganisationId_HousingObjectId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "OrganisationId",
                table: "Invoices");
        }
    }
}
