/****** Object:  Table [dbo].[Consumers]    Script Date: 16.02.2018 23:21:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Consumers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[MiddleName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[JoinDate] [date] NOT NULL,
 CONSTRAINT [PK_Consumers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HousingObjects]    Script Date: 16.02.2018 23:21:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HousingObjects](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Notes] [nvarchar](max) NULL,
 CONSTRAINT [PK_HousingObjects] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[InvoiceItems]    Script Date: 16.02.2018 23:21:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InvoiceItems](
	[Id] [int] NOT NULL,
	[ServicePriceId] [int] NOT NULL,
	[InvoiceId] [int] NOT NULL,
	[Quantity] [tinyint] NOT NULL,
 CONSTRAINT [PK_InvoiceItems] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [NK_InvoiceItems] UNIQUE NONCLUSTERED 
(
	[InvoiceId] ASC,
	[ServicePriceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[InvoicePayments]    Script Date: 16.02.2018 23:21:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InvoicePayments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InvoiceId] [int] NOT NULL,
	[PaymentId] [int] NULL,
	[Amount] [money] NOT NULL,
 CONSTRAINT [PK_InvoicePayments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [NK_InvoicePayments] UNIQUE NONCLUSTERED 
(
	[InvoiceId] ASC,
	[PaymentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Invoices]    Script Date: 16.02.2018 23:21:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Invoices](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrganisationHousingObjectId] [int] NOT NULL,
	[Month] [int] NOT NULL,
 CONSTRAINT [PK_Invoices] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [NK_Invoices] UNIQUE NONCLUSTERED 
(
	[Month] ASC,
	[OrganisationHousingObjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[OrganisationHousingObjects]    Script Date: 16.02.2018 23:21:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganisationHousingObjects](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrganisationId] [smallint] NOT NULL,
	[HousingObjectId] [int] NOT NULL,
	[JoinDate] [date] NOT NULL,
 CONSTRAINT [PK_OrganisationHousingObjects] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [NK_OrganisationHousingObjects] UNIQUE NONCLUSTERED 
(
	[OrganisationId] ASC,
	[HousingObjectId] ASC,
	[JoinDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Organisations]    Script Date: 16.02.2018 23:21:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organisations](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NULL,
 CONSTRAINT [PK_Organisations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Payments]    Script Date: 16.02.2018 23:21:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Amount] [money] NOT NULL,
	[DateTime] [datetime2](2) NOT NULL,
 CONSTRAINT [PK_Payments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ServicePrices]    Script Date: 16.02.2018 23:21:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServicePrices](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ServiceId] [int] NOT NULL,
	[StartMonth] [smallint] NOT NULL,
	[EndMonth] [smallint] NULL,
	[Price] [smallmoney] NOT NULL,
 CONSTRAINT [PK_ServicePrices] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Services]    Script Date: 16.02.2018 23:21:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Services](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrganisationId] [smallint] NOT NULL,
	[Name] [nvarchar](300) NOT NULL,
	[IsCompulsory] [bit] NOT NULL,
 CONSTRAINT [PK_Services] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Index [IX_ServicePrices_ServiceId]    Script Date: 16.02.2018 23:21:58 ******/
CREATE NONCLUSTERED INDEX [IX_ServicePrices_ServiceId] ON [dbo].[ServicePrices]
(
	[ServiceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Services_OrganisationId]    Script Date: 16.02.2018 23:21:58 ******/
CREATE NONCLUSTERED INDEX [IX_Services_OrganisationId] ON [dbo].[Services]
(
	[OrganisationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Invoices] ADD  CONSTRAINT [DF__Invoices__Month__282DF8C2]  DEFAULT ((0)) FOR [Month]
GO
ALTER TABLE [dbo].[InvoiceItems]  WITH CHECK ADD  CONSTRAINT [FK_InvoiceItems_Invoices] FOREIGN KEY([InvoiceId])
REFERENCES [dbo].[Invoices] ([Id])
GO
ALTER TABLE [dbo].[InvoiceItems] CHECK CONSTRAINT [FK_InvoiceItems_Invoices]
GO
ALTER TABLE [dbo].[InvoiceItems]  WITH CHECK ADD  CONSTRAINT [FK_InvoiceItems_ServicePrices] FOREIGN KEY([ServicePriceId])
REFERENCES [dbo].[ServicePrices] ([Id])
GO
ALTER TABLE [dbo].[InvoiceItems] CHECK CONSTRAINT [FK_InvoiceItems_ServicePrices]
GO
ALTER TABLE [dbo].[InvoicePayments]  WITH CHECK ADD  CONSTRAINT [FK_InvoicePayments_Invoices] FOREIGN KEY([InvoiceId])
REFERENCES [dbo].[Invoices] ([Id])
GO
ALTER TABLE [dbo].[InvoicePayments] CHECK CONSTRAINT [FK_InvoicePayments_Invoices]
GO
ALTER TABLE [dbo].[InvoicePayments]  WITH CHECK ADD  CONSTRAINT [FK_InvoicePayments_Payments] FOREIGN KEY([PaymentId])
REFERENCES [dbo].[Payments] ([Id])
GO
ALTER TABLE [dbo].[InvoicePayments] CHECK CONSTRAINT [FK_InvoicePayments_Payments]
GO
ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoices_OrganizationHousingObjects] FOREIGN KEY([OrganisationHousingObjectId])
REFERENCES [dbo].[OrganisationHousingObjects] ([Id])
GO
ALTER TABLE [dbo].[Invoices] CHECK CONSTRAINT [FK_Invoices_OrganizationHousingObjects]
GO
ALTER TABLE [dbo].[OrganisationHousingObjects]  WITH CHECK ADD  CONSTRAINT [FK_OrganisationHousingObjects_HousingObjects] FOREIGN KEY([HousingObjectId])
REFERENCES [dbo].[HousingObjects] ([Id])
GO
ALTER TABLE [dbo].[OrganisationHousingObjects] CHECK CONSTRAINT [FK_OrganisationHousingObjects_HousingObjects]
GO
ALTER TABLE [dbo].[OrganisationHousingObjects]  WITH CHECK ADD  CONSTRAINT [FK_OrganisationHousingObjects_Organisations] FOREIGN KEY([OrganisationId])
REFERENCES [dbo].[Organisations] ([Id])
GO
ALTER TABLE [dbo].[OrganisationHousingObjects] CHECK CONSTRAINT [FK_OrganisationHousingObjects_Organisations]
GO
ALTER TABLE [dbo].[ServicePrices]  WITH CHECK ADD  CONSTRAINT [FK_ServicePrices_Services] FOREIGN KEY([ServiceId])
REFERENCES [dbo].[Services] ([Id])
GO
ALTER TABLE [dbo].[ServicePrices] CHECK CONSTRAINT [FK_ServicePrices_Services]
GO
ALTER TABLE [dbo].[Services]  WITH CHECK ADD  CONSTRAINT [FK_Services_Organisations] FOREIGN KEY([OrganisationId])
REFERENCES [dbo].[Organisations] ([Id])
GO
ALTER TABLE [dbo].[Services] CHECK CONSTRAINT [FK_Services_Organisations]
GO
/****** Object:  StoredProcedure [dbo].[CreateInvoices]    Script Date: 16.02.2018 23:21:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[CreateInvoices] 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    DECLARE @minimumMonth INT, @currentMonth INT;

	SET @currentMonth = DATEDIFF(month, 0, GETDATE());
	SELECT @currentMonth = (ISNULL((SELECT MAX(Month) FROM Invoices AS i WHERE i.OrganisationHousingObjectId = oho.Id), DATEDIFF(month, 0, oho.JoinDate) - 1) + 1)
	FROM [OrganisationHousingObjects] AS oho;
END
