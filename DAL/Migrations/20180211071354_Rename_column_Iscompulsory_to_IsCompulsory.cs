using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Domovoi.DAL.Migrations
{
    public partial class Rename_column_Iscompulsory_to_IsCompulsory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Iscompulsory",
                table: "Services",
                newName: "IsCompulsory");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsCompulsory",
                table: "Services",
                newName: "Iscompulsory");
        }
    }
}
