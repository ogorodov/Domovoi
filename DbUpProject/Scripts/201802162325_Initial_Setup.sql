/****** Object:  Table [dbo].[Consumers]    Script Date: 02.05.2018 13:36:37 ******/
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
/****** Object:  Table [dbo].[HousingObjects]    Script Date: 02.05.2018 13:36:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HousingObjects](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Note] [nvarchar](500) NULL,
 CONSTRAINT [PK_HousingObjects] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[InvoiceItems]    Script Date: 02.05.2018 13:36:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InvoiceItems](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InvoiceId] [int] NOT NULL,
	[ServicePriceId] [int] NOT NULL,
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
/****** Object:  Table [dbo].[InvoicePayments]    Script Date: 02.05.2018 13:36:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InvoicePayments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InvoiceId] [int] NULL,
	[PaymentId] [int] NULL,
	[Amount] [money] NOT NULL,
	[IsApplyPenalty] [bit] NOT NULL CONSTRAINT [DF_InvoicePayments_IsApplyPenalty]  DEFAULT ((0)),
 CONSTRAINT [PK_InvoicePayments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [NK_InvoicePayments] UNIQUE NONCLUSTERED 
(
	[InvoiceId] ASC,
	[PaymentId] ASC,
	[IsApplyPenalty] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Invoices]    Script Date: 02.05.2018 13:36:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Invoices](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrganisationHousingObjectId] [int] NOT NULL,
	[Month] [int] NOT NULL CONSTRAINT [DF__Invoices__Month__282DF8C2]  DEFAULT ((0)),
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
/****** Object:  Table [dbo].[OrganisationHousingObjects]    Script Date: 02.05.2018 13:36:37 ******/
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
/****** Object:  Table [dbo].[Organisations]    Script Date: 02.05.2018 13:36:37 ******/
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
/****** Object:  Table [dbo].[Payments]    Script Date: 02.05.2018 13:36:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[HousingObjectId] [int] NOT NULL,
	[DateTime] [datetime2](2) NOT NULL,
	[Amount] [money] NOT NULL,
 CONSTRAINT [PK_Payments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ServicePrices]    Script Date: 02.05.2018 13:36:37 ******/
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
/****** Object:  Table [dbo].[Services]    Script Date: 02.05.2018 13:36:37 ******/
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
/****** Object:  Index [IX_ServicePrices_ServiceId]    Script Date: 02.05.2018 13:36:37 ******/
CREATE NONCLUSTERED INDEX [IX_ServicePrices_ServiceId] ON [dbo].[ServicePrices]
(
	[ServiceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Services_OrganisationId]    Script Date: 02.05.2018 13:36:37 ******/
CREATE NONCLUSTERED INDEX [IX_Services_OrganisationId] ON [dbo].[Services]
(
	[OrganisationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
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
ALTER TABLE [dbo].[Payments]  WITH CHECK ADD  CONSTRAINT [FK_Payments_HousingObjects] FOREIGN KEY([HousingObjectId])
REFERENCES [dbo].[HousingObjects] ([Id])
GO
ALTER TABLE [dbo].[Payments] CHECK CONSTRAINT [FK_Payments_HousingObjects]
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
/****** Object:  StoredProcedure [dbo].[CreateInvoices]    Script Date: 02.05.2018 13:36:37 ******/
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

	DECLARE @InvoicesIds TABLE (Id int NOT NULL PRIMARY KEY);

	BEGIN TRANSACTION;

	/* Generate new Invices */
	INSERT INTO Invoices (OrganisationHousingObjectId, [Month])
	OUTPUT inserted.id INTO @InvoicesIds
	SELECT q1.OrganisationHousingObjectId
		,[values].number
	FROM
	(
		SELECT oho.Id AS OrganisationHousingObjectId,
			(ISNULL((SELECT MAX(Month) FROM Invoices AS i WHERE i.OrganisationHousingObjectId = oho.Id), DATEDIFF(month, 0, oho.JoinDate) - 1) + 1) AS InvoiceMonth
		FROM OrganisationHousingObjects AS oho
	) AS q1
	LEFT JOIN master..spt_values AS [values] ON [values].[type] = 'p' AND [values].number BETWEEN q1.InvoiceMonth AND @currentMonth
	WHERE q1.InvoiceMonth <= @currentMonth;
	
	/* Generate Items for invoices */
	INSERT INTO InvoiceItems (InvoiceId, ServicePriceId, Quantity)
	SELECT i.Id AS InvoiceId
		,sp.Id AS ServicePriceId
		,1 AS Quantity
	FROM Invoices AS i
		INNER JOIN @InvoicesIds AS ids ON ids.Id = i.Id
		INNER JOIN OrganisationHousingObjects AS oho ON oho.Id = i.OrganisationHousingObjectId
		INNER JOIN [Services] AS s on s.OrganisationId = oho.OrganisationId
		INNER JOIN ServicePrices AS sp ON sp.ServiceId = s.Id AND i.[Month] >= sp.StartMonth AND (sp.EndMonth IS NULL OR i.[Month] <= sp.EndMonth)

	/* Calculate invoces summs */
	DECLARE @i TABLE (InvoiceId INT NOT NULL, IsCompulsory BIT NOT NULL, HousingObjectId INT NOT NULL, TotalStart MONEY NOT NULL, TotalEnd MONEY NOT NULL);
	INSERT INTO @i
	SELECT InvoiceId, IsCompulsory, HousingObjectId
		,TotalSum - [Sum] AS TotalStart
		,TotalSum AS TotalEnd
	FROM
	(
		SELECT InvoiceId, IsCompulsory, HousingObjectId, [Sum]
			, SUM([sum]) OVER(PARTITION BY HousingObjectId ORDER BY IsCompulsory DESC, Month, InvoiceId) AS TotalSum
		FROM
		(
			SELECT 
				i.Id AS InvoiceId
				,i.Month
				,s.IsCompulsory
				,oho.HousingObjectId
				,SUM(sp.Price * ii.Quantity) AS [Sum]
			FROM Invoices AS i
				--INNER JOIN @InvoicesIds AS ids ON ids.Id = i.Id
				INNER JOIN OrganisationHousingObjects AS oho ON oho.Id = i.OrganisationHousingObjectId
				INNER JOIN InvoiceItems AS ii ON ii.InvoiceId = i.Id
				INNER JOIN ServicePrices AS sp ON sp.Id = ii.ServicePriceId
				INNER JOIN [Services] AS s on s.Id = sp.ServiceId
			GROUP BY oho.HousingObjectId, i.Month, i.Id, s.IsCompulsory
		) AS q1
	) AS q2

	/* Возьмём доступные платежи, т.е. платежи не связанные с извещением */
	DECLARE @p TABLE (InvoicePaymentId INT NOT NULL, PaymentId INT NOT NULL, HousingObjectId INT NOT NULL, TotalStart MONEY NOT NULL, TotalEnd MONEY NOT NULL);
	INSERT INTO @p
	SELECT InvoicePaymentId
		,PaymentId
		,HousingObjectId
		,TotalSum - Amount AS TotalStart
		,TotalSum AS TotalEnd
	FROM
	(
		SELECT ip.Id AS InvoicePaymentId
			,ip.PaymentId
			,p.HousingObjectId
			,ip.Amount
			,SUM(ip.Amount) OVER(PARTITION BY p.HousingObjectId ORDER BY p.DateTime) AS TotalSum
		FROM InvoicePayments AS ip
			INNER JOIN Payments AS p ON p.Id = ip.PaymentId
		WHERE ip.InvoiceId IS NULL
	) AS q1

	/* Создадим строки для InvoicePayments таблицы */
	MERGE INTO InvoicePayments AS [target]
		USING 
		(
			SELECT p.InvoicePaymentId AS Id
				,i.InvoiceId
				,p.PaymentId
				,q2.TotalEnd - q2.TotalStart AS Amount
				,ISNULL(i.IsCompulsory, 0) AS IsApplyPenalty
				,ROW_NUMBER() OVER(PARTITION BY p.InvoicePaymentId ORDER BY q2.HousingObjectId, q2.TotalStart) AS RowNumber
			FROM
			(
				/* для каждого значения добавим результат предыдущей строки */
				SELECT DISTINCT HousingObjectId
					,LAG(TotalEnd, 1, 0) OVER(PARTITION BY HousingObjectId ORDER BY TotalEnd) AS TotalStart
					,TotalEnd
				FROM
				(
					/* возьмём все значения нарастающих итогов из таблиц "платежи" и "суммы платёжного извещения" (уникальное объединение множеств @i.TotalEnd & @p.TotalEnd) */
					SELECT i.HousingObjectId, i.TotalEnd
					FROM @i AS i
					UNION SELECT p.HousingObjectId, p.TotalEnd
					FROM @p AS p
				) AS q1
			) AS q2
			LEFT JOIN @i AS i ON i.HousingObjectId = q2.HousingObjectId AND q2.TotalEnd > i.TotalStart AND q2.TotalEnd <= i.TotalEnd
			LEFT JOIN @p AS p ON p.HousingObjectId = q2.HousingObjectId AND q2.TotalEnd > p.TotalStart AND q2.TotalEnd <= p.TotalEnd
		) AS [source]
		ON [target].Id = [source].Id AND [source].RowNumber = 1
	WHEN MATCHED THEN   
		UPDATE SET InvoiceId = source.InvoiceId, Amount = source.Amount, IsApplyPenalty = source.IsApplyPenalty
	WHEN NOT MATCHED THEN  
		INSERT (InvoiceId, PaymentId, Amount, IsApplyPenalty)
		VALUES (source.InvoiceId, source.PaymentId, source.Amount, source.IsApplyPenalty);
	
	COMMIT;
END
