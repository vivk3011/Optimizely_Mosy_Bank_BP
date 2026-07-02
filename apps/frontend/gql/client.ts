import type * as Schema from "./graphql";
import type { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export const LinkDataFragmentDoc = gql`
    fragment LinkData on ContentUrl {
  type
  base
  default
}
    `;
export const ButtonBlockPropertyDataFragmentDoc = gql`
    fragment ButtonBlockPropertyData on ButtonBlockProperty {
  children: ButtonText
  url: ButtonUrl {
    ...LinkData
  }
  className: ButtonClass
  buttonType: buttonType
  buttonVariant: ButtonVariant
}
    `;
export const ReferenceDataFragmentDoc = gql`
    fragment ReferenceData on ContentReference {
  key
  url {
    ...LinkData
  }
}
    `;
export const PageSeoSettingsPropertyDataFragmentDoc = gql`
    fragment PageSeoSettingsPropertyData on PageSeoSettingsProperty {
  metaTitle
  MetaDescription
  MetaKeywords
  SharingImage {
    ...ReferenceData
  }
  GraphType
}
    `;
export const CompositionNodeDataFragmentDoc = gql`
    fragment CompositionNodeData on ICompositionNode {
  name: displayName
  layoutType: nodeType
  type
  key
  template: displayTemplateKey
  settings: displaySettings {
    key
    value
  }
}
    `;
export const IContentInfoFragmentDoc = gql`
    fragment IContentInfo on IContentMetadata {
  key
  locale
  types
  displayName
  version
  url {
    ...LinkData
  }
}
    `;
export const IContentDataFragmentDoc = gql`
    fragment IContentData on _IContent {
  _metadata {
    ...IContentInfo
  }
  _type: __typename
}
    `;
export const BlockDataFragmentDoc = gql`
    fragment BlockData on _IComponent {
  ...IContentData
}
    `;
export const IElementDataFragmentDoc = gql`
    fragment IElementData on _IComponent {
  _metadata {
    ...IContentInfo
  }
  _type: __typename
}
    `;
export const ElementDataFragmentDoc = gql`
    fragment ElementData on _IComponent {
  ...IElementData
}
    `;
export const ArticleListElementDataFragmentDoc = gql`
    fragment ArticleListElementData on ArticleListElement {
  articleListCount
  topics
}
    `;
export const BannerDataFragmentDoc = gql`
    fragment BannerData on Banner {
  bannerTitle: Title
  bannerDescription: Description
  bannerButtonText: ButtonText
}
    `;
export const ButtonBlockDataFragmentDoc = gql`
    fragment ButtonBlockData on ButtonBlock {
  children: ButtonText
  url: ButtonUrl {
    ...LinkData
  }
  className: ButtonClass
  buttonType: buttonType
  buttonVariant: ButtonVariant
}
    `;
export const CTAElementDataFragmentDoc = gql`
    fragment CTAElementData on CTAElement {
  cta_text: Text
  cta_link: Link {
    ...LinkData
  }
}
    `;
export const IContentListItemFragmentDoc = gql`
    fragment IContentListItem on _IContent {
  ...IContentData
}
    `;
export const ImageMediaComponentDataFragmentDoc = gql`
    fragment ImageMediaComponentData on ImageMedia {
  alt: AltText
  meta: _metadata {
    url {
      default
    }
    name: displayName
  }
}
    `;
export const VideoMediaComponentDataFragmentDoc = gql`
    fragment VideoMediaComponentData on VideoMedia {
  meta: _metadata {
    url {
      default
    }
    name: displayName
  }
}
    `;
export const ContentCarouselDataFragmentDoc = gql`
    fragment ContentCarouselData on ContentCarousel {
  heading
  _metadata {
    key
    locale
  }
}
    `;
export const ContentRecsElementDataFragmentDoc = gql`
    fragment ContentRecsElementData on ContentRecsElement {
  ElementDeliveryApiKey
  ElementRecommendationCount
}
    `;
export const HeadingElementDataFragmentDoc = gql`
    fragment HeadingElementData on HeadingElement {
  headingText
}
    `;
export const HeroBlockDataFragmentDoc = gql`
    fragment HeroBlockData on HeroBlock {
  title
  subtitle
  showDecoration
  decorationColorsPrimary
  decorationColorsSecondary
}
    `;
export const ImageElementDataFragmentDoc = gql`
    fragment ImageElementData on ImageElement {
  altText
  imageLink {
    ...ReferenceData
  }
}
    `;
export const LinkItemDataFragmentDoc = gql`
    fragment LinkItemData on Link {
  title
  text
  target
  url {
    ...LinkData
  }
}
    `;
export const LayoutSettingsBlockDataFragmentDoc = gql`
    fragment LayoutSettingsBlockData on LayoutSettingsBlock {
  mainMenu {
    ...IContentListItem
    ...ImageMediaComponentData
    ...VideoMediaComponentData
  }
  contactInfoHeading
  serviceButtons {
    ...IContentListItem
    ...ImageMediaComponentData
    ...VideoMediaComponentData
  }
  contactInfo {
    json
    html
  }
  footerMenus {
    ...IContentListItem
    ...ImageMediaComponentData
    ...VideoMediaComponentData
  }
  copyright
  legalLinks {
    ...LinkItemData
  }
  appIdentifiers
}
    `;
export const MenuNavigationBlockDataFragmentDoc = gql`
    fragment MenuNavigationBlockData on MenuNavigationBlock {
  _metadata {
    displayName
  }
  MenuNavigationHeading
  NavigationLinks {
    ...LinkItemData
  }
}
    `;
export const BlogPostPageMenuBlockFragmentDoc = gql`
    fragment BlogPostPageMenuBlock on BlogPostPage {
  meta: _metadata {
    published
    url {
      ...LinkData
    }
  }
  topics: Topic
  heading: Heading
  author: ArticleAuthor
  image: BlogPostPromoImage {
    ...ReferenceData
  }
  sharing: SeoSettings {
    description: MetaDescription
    image: SharingImage {
      ...ReferenceData
    }
  }
}
    `;
export const MegaMenuGroupBlockDataFragmentDoc = gql`
    fragment MegaMenuGroupBlockData on MegaMenuGroupBlock {
  _metadata {
    displayName
  }
  MenuMenuHeading
  MegaMenuUrl {
    ...LinkData
  }
  MegaMenuContentArea {
    ...IContentData
    ...MenuNavigationBlockData
    ...BlogPostPageMenuBlock
  }
}
    `;
export const OdpEmbedBlockDataFragmentDoc = gql`
    fragment OdpEmbedBlockData on OdpEmbedBlock {
  ContentId
}
    `;
export const OptiFormsChoiceElementDataFragmentDoc = gql`
    fragment OptiFormsChoiceElementData on OptiFormsChoiceElement {
  Label
  Tooltip
  Options
  AllowMultiSelect
  Validators
}
    `;
export const OptiFormsSelectionElementDataFragmentDoc = gql`
    fragment OptiFormsSelectionElementData on OptiFormsSelectionElement {
  Label
  Placeholder
  Tooltip
  Options
  AllowMultiSelect
  AutoComplete
  Validators
}
    `;
export const OptiFormsTextareaElementDataFragmentDoc = gql`
    fragment OptiFormsTextareaElementData on OptiFormsTextareaElement {
  Label
  Placeholder
  PredefinedValue
  Tooltip
  AutoComplete
  Validators
}
    `;
export const OptiFormsTextboxElementDataFragmentDoc = gql`
    fragment OptiFormsTextboxElementData on OptiFormsTextboxElement {
  Label
  Placeholder
  PredefinedValue
  Tooltip
  AutoComplete
  Validators
}
    `;
export const OptiFormsUrlElementDataFragmentDoc = gql`
    fragment OptiFormsUrlElementData on OptiFormsUrlElement {
  Label
  Placeholder
  PredefinedValue
  Tooltip
  Validators
}
    `;
export const PageSeoSettingsDataFragmentDoc = gql`
    fragment PageSeoSettingsData on PageSeoSettings {
  metaTitle
  MetaDescription
  MetaKeywords
  SharingImage {
    ...ReferenceData
  }
  GraphType
}
    `;
export const ParagraphElementDataFragmentDoc = gql`
    fragment ParagraphElementData on ParagraphElement {
  text {
    json
  }
}
    `;
export const QuoteBlockDataFragmentDoc = gql`
    fragment QuoteBlockData on QuoteBlock {
  quote: QuoteText
  color: QuoteColor
  active: QuoteActive
  name: QuoteProfileName
  profilePicture: QuoteProfilePicture {
    ...ReferenceData
  }
  location: QuoteProfileLocation
}
    `;
export const RichTextElementDataFragmentDoc = gql`
    fragment RichTextElementData on RichTextElement {
  text {
    json
    html
  }
  csstext
  jstext
}
    `;
export const TestimonialElementDataFragmentDoc = gql`
    fragment TestimonialElementData on TestimonialElement {
  customerName
  customerLocation
  customerImage {
    ...ReferenceData
  }
  referenceTitle
  referenceText {
    json
  }
}
    `;
export const TextBlockDataFragmentDoc = gql`
    fragment TextBlockData on TextBlock {
  overline: TextBlockOverline
  headingSize: TextBlockHeadingSize
  heading: TextBlockHeading
  description: TextBlockDescription {
    json
    html
  }
  center: TextCenter
  width: TextBlockWidth
  textClassName: TextClassName
}
    `;
export const VideoElementDataFragmentDoc = gql`
    fragment VideoElementData on VideoElement {
  title
  video {
    ...ReferenceData
  }
}
    `;
export const shops_BenefitListItemDataFragmentDoc = gql`
    fragment shops_BenefitListItemData on shops_BenefitListItem {
  title
  description {
    json
    html
  }
}
    `;
export const shops_BenefitListSectionDataFragmentDoc = gql`
    fragment shops_BenefitListSectionData on shops_BenefitListSection {
  heading
  ctaLabel
  ctaHref {
    default
    base
  }
  imageAlt
  benefit1 {
    key
    item {
      ... on shops_BenefitListItem {
        ...shops_BenefitListItemData
      }
    }
  }
  benefit2 {
    key
    item {
      ... on shops_BenefitListItem {
        ...shops_BenefitListItemData
      }
    }
  }
  benefit3 {
    key
    item {
      ... on shops_BenefitListItem {
        ...shops_BenefitListItemData
      }
    }
  }
}
    `;
export const shops_CtaBannerDataFragmentDoc = gql`
    fragment shops_CtaBannerData on shops_CtaBanner {
  eyebrow
  heading
  buttonLabel
  buttonHref {
    default
    base
  }
  backgroundTone
}
    `;
export const shops_FeatureGridItemDataFragmentDoc = gql`
    fragment shops_FeatureGridItemData on shops_FeatureGridItem {
  title
  description {
    json
    html
  }
  variant
  imageAlt
}
    `;
export const shops_FeatureGridDataFragmentDoc = gql`
    fragment shops_FeatureGridData on shops_FeatureGrid {
  sectionBackgroundTone
  items {
    key
    item {
      ... on shops_FeatureGridItem {
        ...shops_FeatureGridItemData
      }
    }
  }
  items2 {
    key
    item {
      ... on shops_FeatureGridItem {
        ...shops_FeatureGridItemData
      }
    }
  }
  items3 {
    key
    item {
      ... on shops_FeatureGridItem {
        ...shops_FeatureGridItemData
      }
    }
  }
}
    `;
export const shops_HeadlineBandDataFragmentDoc = gql`
    fragment shops_HeadlineBandData on shops_HeadlineBand {
  prefixText
  accentText
  backgroundTone
  accentTone
}
    `;
export const shops_MediaSpotlightDataFragmentDoc = gql`
    fragment shops_MediaSpotlightData on shops_MediaSpotlight {
  heading
  body {
    json
    html
  }
  ctaLabel
  ctaHref {
    default
    base
  }
  mediaAlt
  mediaAlignment
}
    `;
export const BlankSectionDataFragmentDoc = gql`
    fragment BlankSectionData on BlankSection {
  _metadata {
    key
  }
}
    `;
export const ContinueReadingComponentDataFragmentDoc = gql`
    fragment ContinueReadingComponentData on ContinueReadingComponent {
  topline
  shared
  heading
  content {
    ...IContentData
    ...BlockData
    ...ArticleListElementData
    ...BannerData
    ...ButtonBlockData
    ...CTAElementData
    ...CarouselBlockData
    ...ContentCarouselData
    ...ContentRecsElementData
    ...ContinueReadingComponentData
    ...HeadingElementData
    ...HeroBlockData
    ...ImageElementData
    ...LayoutSettingsBlockData
    ...MegaMenuGroupBlockData
    ...MenuNavigationBlockData
    ...OdpEmbedBlockData
    ...OptiFormsChoiceElementData
    ...OptiFormsSelectionElementData
    ...OptiFormsTextareaElementData
    ...OptiFormsTextboxElementData
    ...OptiFormsUrlElementData
    ...PageSeoSettingsData
    ...ParagraphElementData
    ...QuoteBlockData
    ...RichTextElementData
    ...TestimonialElementData
    ...TextBlockData
    ...VideoElementData
    ...shops_BenefitListItemData
    ...shops_BenefitListSectionData
    ...shops_CtaBannerData
    ...shops_FeatureGridData
    ...shops_FeatureGridItemData
    ...shops_HeadlineBandData
    ...shops_MediaSpotlightData
    ...BlankSectionData
  }
}
    `;
export const CarouselBlockDataFragmentDoc = gql`
    fragment CarouselBlockData on CarouselBlock {
  CarouselItemsContentArea {
    ...IContentListItem
    ...BlockData
    ...ImageMediaComponentData
    ...VideoMediaComponentData
    ...ArticleListElementData
    ...BannerData
    ...ButtonBlockData
    ...CTAElementData
    ...CarouselBlockData
    ...ContentCarouselData
    ...ContentRecsElementData
    ...ContinueReadingComponentData
    ...HeadingElementData
    ...HeroBlockData
    ...ImageElementData
    ...LayoutSettingsBlockData
    ...MegaMenuGroupBlockData
    ...MenuNavigationBlockData
    ...OdpEmbedBlockData
    ...OptiFormsChoiceElementData
    ...OptiFormsSelectionElementData
    ...OptiFormsTextareaElementData
    ...OptiFormsTextboxElementData
    ...OptiFormsUrlElementData
    ...PageSeoSettingsData
    ...ParagraphElementData
    ...QuoteBlockData
    ...RichTextElementData
    ...TestimonialElementData
    ...TextBlockData
    ...VideoElementData
    ...shops_BenefitListItemData
    ...shops_BenefitListSectionData
    ...shops_CtaBannerData
    ...shops_FeatureGridData
    ...shops_FeatureGridItemData
    ...shops_HeadlineBandData
    ...shops_MediaSpotlightData
    ...BlankSectionData
  }
}
    `;
export const CompositionComponentNodeDataFragmentDoc = gql`
    fragment CompositionComponentNodeData on ICompositionComponentNode {
  component {
    ...BlockData
    ...ElementData
    ...ArticleListElementData
    ...BannerData
    ...ButtonBlockData
    ...CTAElementData
    ...CarouselBlockData
    ...ContentCarouselData
    ...ContentRecsElementData
    ...ContinueReadingComponentData
    ...HeadingElementData
    ...HeroBlockData
    ...ImageElementData
    ...LayoutSettingsBlockData
    ...MegaMenuGroupBlockData
    ...MenuNavigationBlockData
    ...OdpEmbedBlockData
    ...OptiFormsChoiceElementData
    ...OptiFormsSelectionElementData
    ...OptiFormsTextareaElementData
    ...OptiFormsTextboxElementData
    ...OptiFormsUrlElementData
    ...PageSeoSettingsData
    ...ParagraphElementData
    ...QuoteBlockData
    ...RichTextElementData
    ...TestimonialElementData
    ...TextBlockData
    ...VideoElementData
    ...shops_BenefitListItemData
    ...shops_BenefitListSectionData
    ...shops_CtaBannerData
    ...shops_FeatureGridData
    ...shops_FeatureGridItemData
    ...shops_HeadlineBandData
    ...shops_MediaSpotlightData
    ...BlankSectionData
  }
}
    `;
export const ExperienceDataFragmentDoc = gql`
    fragment ExperienceData on _IExperience {
  composition {
    ...CompositionNodeData
    nodes {
      ...CompositionNodeData
      ... on ICompositionStructureNode {
        nodes {
          ...CompositionNodeData
          ... on ICompositionStructureNode {
            nodes {
              ...CompositionNodeData
              ... on ICompositionStructureNode {
                nodes {
                  ...CompositionNodeData
                  ...CompositionComponentNodeData
                  ... on ICompositionStructureNode {
                    nodes {
                      ...CompositionNodeData
                      ...CompositionComponentNodeData
                    }
                  }
                }
              }
            }
          }
        }
      }
      ...CompositionComponentNodeData
    }
  }
}
    `;
export const BlankExperienceDataFragmentDoc = gql`
    fragment BlankExperienceData on BlankExperience {
  BlankExperienceSeoSettings {
    ...PageSeoSettingsPropertyData
  }
  ...ExperienceData
}
    `;
export const BlogSectionExperienceDataFragmentDoc = gql`
    fragment BlogSectionExperienceData on BlogSectionExperience {
  ...ExperienceData
}
    `;
export const BlogPostPageDataFragmentDoc = gql`
    fragment BlogPostPageData on BlogPostPage {
  blogTitle: Heading
  blogSubtitle: ArticleSubHeading
  blogImage: BlogPostPromoImage {
    ...ReferenceData
  }
  blogBody: BlogPostBody {
    json
  }
  blogAuthor: ArticleAuthor
  blogTopics: Topic
  continueReading {
    ...IContentListItem
    ...BlockData
    ...ImageMediaComponentData
    ...VideoMediaComponentData
    ...ArticleListElementData
    ...BannerData
    ...ButtonBlockData
    ...CTAElementData
    ...CarouselBlockData
    ...ContentCarouselData
    ...ContentRecsElementData
    ...ContinueReadingComponentData
    ...HeadingElementData
    ...HeroBlockData
    ...ImageElementData
    ...LayoutSettingsBlockData
    ...MegaMenuGroupBlockData
    ...MenuNavigationBlockData
    ...OdpEmbedBlockData
    ...OptiFormsChoiceElementData
    ...OptiFormsSelectionElementData
    ...OptiFormsTextareaElementData
    ...OptiFormsTextboxElementData
    ...OptiFormsUrlElementData
    ...PageSeoSettingsData
    ...ParagraphElementData
    ...QuoteBlockData
    ...RichTextElementData
    ...TestimonialElementData
    ...TextBlockData
    ...VideoElementData
    ...shops_BenefitListItemData
    ...shops_BenefitListSectionData
    ...shops_CtaBannerData
    ...shops_FeatureGridData
    ...shops_FeatureGridItemData
    ...shops_HeadlineBandData
    ...shops_MediaSpotlightData
    ...BlankSectionData
  }
}
    `;
export const BlogPostPageSearchResultFragmentDoc = gql`
    fragment BlogPostPageSearchResult on BlogPostPage {
  title: Heading
  image: BlogPostPromoImage {
    ...ReferenceData
  }
  author: ArticleAuthor
  seodata: SeoSettings {
    metaTitle
    MetaDescription
  }
  _metadata {
    published
  }
}
    `;
export const LandingPageDataFragmentDoc = gql`
    fragment LandingPageData on LandingPage {
  TopContentArea {
    ...BlockData
    ...ArticleListElementData
    ...BannerData
    ...ButtonBlockData
    ...CTAElementData
    ...CarouselBlockData
    ...ContentCarouselData
    ...ContentRecsElementData
    ...ContinueReadingComponentData
    ...HeadingElementData
    ...HeroBlockData
    ...ImageElementData
    ...LayoutSettingsBlockData
    ...MegaMenuGroupBlockData
    ...MenuNavigationBlockData
    ...OdpEmbedBlockData
    ...OptiFormsChoiceElementData
    ...OptiFormsSelectionElementData
    ...OptiFormsTextareaElementData
    ...OptiFormsTextboxElementData
    ...OptiFormsUrlElementData
    ...PageSeoSettingsData
    ...ParagraphElementData
    ...QuoteBlockData
    ...RichTextElementData
    ...TestimonialElementData
    ...TextBlockData
    ...VideoElementData
    ...shops_BenefitListItemData
    ...shops_BenefitListSectionData
    ...shops_CtaBannerData
    ...shops_FeatureGridData
    ...shops_FeatureGridItemData
    ...shops_HeadlineBandData
    ...shops_MediaSpotlightData
    ...BlankSectionData
  }
  MainContentArea {
    ...BlockData
    ...ArticleListElementData
    ...BannerData
    ...ButtonBlockData
    ...CTAElementData
    ...CarouselBlockData
    ...ContentCarouselData
    ...ContentRecsElementData
    ...ContinueReadingComponentData
    ...HeadingElementData
    ...HeroBlockData
    ...ImageElementData
    ...LayoutSettingsBlockData
    ...MegaMenuGroupBlockData
    ...MenuNavigationBlockData
    ...OdpEmbedBlockData
    ...OptiFormsChoiceElementData
    ...OptiFormsSelectionElementData
    ...OptiFormsTextareaElementData
    ...OptiFormsTextboxElementData
    ...OptiFormsUrlElementData
    ...PageSeoSettingsData
    ...ParagraphElementData
    ...QuoteBlockData
    ...RichTextElementData
    ...TestimonialElementData
    ...TextBlockData
    ...VideoElementData
    ...shops_BenefitListItemData
    ...shops_BenefitListSectionData
    ...shops_CtaBannerData
    ...shops_FeatureGridData
    ...shops_FeatureGridItemData
    ...shops_HeadlineBandData
    ...shops_MediaSpotlightData
    ...BlankSectionData
  }
}
    `;
export const StaticPageDataFragmentDoc = gql`
    fragment StaticPageData on StaticPage {
  PageTitle
  PageContent {
    ...BlockData
    ...ArticleListElementData
    ...BannerData
    ...ButtonBlockData
    ...CTAElementData
    ...CarouselBlockData
    ...ContentCarouselData
    ...ContentRecsElementData
    ...ContinueReadingComponentData
    ...HeadingElementData
    ...HeroBlockData
    ...ImageElementData
    ...LayoutSettingsBlockData
    ...MegaMenuGroupBlockData
    ...MenuNavigationBlockData
    ...OdpEmbedBlockData
    ...OptiFormsChoiceElementData
    ...OptiFormsSelectionElementData
    ...OptiFormsTextareaElementData
    ...OptiFormsTextboxElementData
    ...OptiFormsUrlElementData
    ...PageSeoSettingsData
    ...ParagraphElementData
    ...QuoteBlockData
    ...RichTextElementData
    ...TestimonialElementData
    ...TextBlockData
    ...VideoElementData
    ...shops_BenefitListItemData
    ...shops_BenefitListSectionData
    ...shops_CtaBannerData
    ...shops_FeatureGridData
    ...shops_FeatureGridItemData
    ...shops_HeadlineBandData
    ...shops_MediaSpotlightData
    ...BlankSectionData
  }
}
    `;
export const SearchDataFragmentDoc = gql`
    fragment SearchData on _IContent {
  ...IContentData
}
    `;
export const PageDataFragmentDoc = gql`
    fragment PageData on _IContent {
  ...IContentData
}
    `;
export const getArticleListElementItemsDocument = gql`
    query getArticleListElementItems($count: Int!, $locale: [Locales], $topics: [String], $excludeKeys: [String]) {
  BlogPostPage(
    orderBy: {_metadata: {published: DESC}}
    limit: $count
    locale: $locale
    where: {_metadata: {status: {eq: "Published"}, key: {notIn: $excludeKeys}}, Topic: {in: $topics}}
  ) {
    items {
      ...IContentData
      articleMeta: _metadata {
        key
        published
        lastModified
      }
      blogTitle: Heading
      blogSubtitle: ArticleSubHeading
      blogImage: BlogPostPromoImage {
        ...ReferenceData
      }
      blogBody: BlogPostBody {
        json
      }
      blogAuthor: ArticleAuthor
    }
  }
}
    ${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${ReferenceDataFragmentDoc}`;
export const getDefaultArticleListDocument = gql`
    query getDefaultArticleList($locale: [Locales!]) {
  ArticleListElement(
    where: {_metadata: {displayName: {startsWith: "[DEFAULT]"}, status: {eq: "Published"}}}
    locale: $locale
    orderBy: {_metadata: {published: DESC}}
    limit: 1
  ) {
    items {
      ...IContentData
      ...ArticleListElementData
    }
  }
}
    ${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${ArticleListElementDataFragmentDoc}`;
export const getSharedContinueReadingDocument = gql`
    query getSharedContinueReading($locale: [Locales]) {
  ContinueReadingComponent(where: {shared: {eq: true}}, locale: $locale) {
    total
    item {
      ...IContentData
      ...ContinueReadingComponentData
    }
  }
}
    ${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${ContinueReadingComponentDataFragmentDoc}
${BlockDataFragmentDoc}
${ArticleListElementDataFragmentDoc}
${BannerDataFragmentDoc}
${ButtonBlockDataFragmentDoc}
${CTAElementDataFragmentDoc}
${CarouselBlockDataFragmentDoc}
${IContentListItemFragmentDoc}
${ImageMediaComponentDataFragmentDoc}
${VideoMediaComponentDataFragmentDoc}
${ContentCarouselDataFragmentDoc}
${ContentRecsElementDataFragmentDoc}
${HeadingElementDataFragmentDoc}
${HeroBlockDataFragmentDoc}
${ImageElementDataFragmentDoc}
${ReferenceDataFragmentDoc}
${LayoutSettingsBlockDataFragmentDoc}
${LinkItemDataFragmentDoc}
${MegaMenuGroupBlockDataFragmentDoc}
${MenuNavigationBlockDataFragmentDoc}
${BlogPostPageMenuBlockFragmentDoc}
${OdpEmbedBlockDataFragmentDoc}
${OptiFormsChoiceElementDataFragmentDoc}
${OptiFormsSelectionElementDataFragmentDoc}
${OptiFormsTextareaElementDataFragmentDoc}
${OptiFormsTextboxElementDataFragmentDoc}
${OptiFormsUrlElementDataFragmentDoc}
${PageSeoSettingsDataFragmentDoc}
${ParagraphElementDataFragmentDoc}
${QuoteBlockDataFragmentDoc}
${RichTextElementDataFragmentDoc}
${TestimonialElementDataFragmentDoc}
${TextBlockDataFragmentDoc}
${VideoElementDataFragmentDoc}
${shops_BenefitListItemDataFragmentDoc}
${shops_BenefitListSectionDataFragmentDoc}
${shops_CtaBannerDataFragmentDoc}
${shops_FeatureGridDataFragmentDoc}
${shops_FeatureGridItemDataFragmentDoc}
${shops_HeadlineBandDataFragmentDoc}
${shops_MediaSpotlightDataFragmentDoc}
${BlankSectionDataFragmentDoc}`;
export const getBlankExperienceMetaDataDocument = gql`
    query getBlankExperienceMetaData($key: String!, $locale: [Locales]) {
  page: BlankExperience(where: {_metadata: {key: {eq: $key}}}, locale: $locale) {
    items {
      meta: _metadata {
        url {
          base
        }
        displayName
      }
      seo: BlankExperienceSeoSettings {
        title: metaTitle
        description: MetaDescription
        image: SharingImage {
          ...ReferenceData
        }
        type: GraphType
      }
    }
  }
}
    ${ReferenceDataFragmentDoc}
${LinkDataFragmentDoc}`;
export const getChildBlogPostsDocument = gql`
    query getChildBlogPosts($parentKey: String!, $locale: [Locales!]! = ALL, $author: [String!], $topic: [String!], $limit: Int! = 9, $skip: Int! = 0) {
  result: BlogSectionExperience(
    where: {_metadata: {key: {eq: $parentKey}}}
    locale: $locale
  ) {
    items {
      container: _metadata {
        key
        displayName
      }
      items: _link(type: ITEMS) {
        BlogPostPage(skip: $skip, limit: $limit, locale: $locale) {
          total
          items {
            ...IContentData
            metadata: _metadata {
              key
              url {
                base
                default
              }
              published
            }
            heading: Heading
            subheading: ArticleSubHeading
            author: ArticleAuthor
            topic: Topic
            image: BlogPostPromoImage {
              src: url {
                base
                default
              }
            }
          }
          facets {
            author: ArticleAuthor(filters: $author) {
              name
              count
            }
            topic: Topic(orderBy: ASC, filters: $topic) {
              name
              count
            }
            metadata: _metadata {
              published(unit: DAY) {
                name
                count
              }
            }
          }
        }
      }
    }
  }
}
    ${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}`;
export const getBlogSectionExperienceMetaDataDocument = gql`
    query getBlogSectionExperienceMetaData($key: String!, $version: String, $locale: [Locales!]) {
  page: BlogSectionExperience(
    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}
    locale: $locale
  ) {
    items {
      _metadata {
        displayName
        published
        url {
          base
          default
        }
      }
      seo_data {
        ...PageSeoSettingsPropertyData
      }
    }
  }
}
    ${PageSeoSettingsPropertyDataFragmentDoc}
${ReferenceDataFragmentDoc}
${LinkDataFragmentDoc}`;
export const getBlogPostPageMetaDataDocument = gql`
    query getBlogPostPageMetaData($key: String!, $version: String, $locale: [Locales!]) {
  BlogPostPage(
    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}
    locale: $locale
  ) {
    pages: items {
      cms: _metadata {
        title: displayName
        published
        url {
          base
          default
        }
      }
      title: Heading
      author: ArticleAuthor
      image: BlogPostPromoImage {
        ...ReferenceData
      }
      topics: Topic
      seo: SeoSettings {
        title: metaTitle
        description: MetaDescription
        keywords: MetaKeywords
        image: SharingImage {
          ...ReferenceData
        }
        type: GraphType
      }
    }
  }
}
    ${ReferenceDataFragmentDoc}
${LinkDataFragmentDoc}`;
export const getLandingPageMetaDataDocument = gql`
    query getLandingPageMetaData($key: String!, $version: String, $locale: [Locales]) {
  LandingPage(
    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}
    locale: $locale
  ) {
    pages: items {
      _metadata {
        displayName
        key
        version
        locale
        url {
          base
        }
      }
      SeoSettings {
        metaTitle
        MetaDescription
        SharingImage {
          ...ReferenceData
        }
        GraphType
      }
    }
  }
}
    ${ReferenceDataFragmentDoc}
${LinkDataFragmentDoc}`;
export const getStaticPageMetaDataDocument = gql`
    query getStaticPageMetaData($key: String!, $version: String, $locale: [Locales]) {
  StaticPage(
    where: {_metadata: {key: {eq: $key}, version: {eq: $version}}}
    locale: $locale
  ) {
    pages: items {
      _metadata {
        displayName
        key
        version
        locale
        url {
          base
        }
      }
      PageTitle
      SeoSetting {
        metaTitle
        MetaDescription
        SharingImage {
          ...ReferenceData
        }
        GraphType
      }
    }
  }
}
    ${ReferenceDataFragmentDoc}
${LinkDataFragmentDoc}`;
export const getFooterDataDocument = gql`
    query getFooterData($domain: String, $locale: [Locales!]) {
  appLayout: LayoutSettingsBlock(
    where: {_or: [{appIdentifiers: {exist: false}}, {_and: [{appIdentifiers: {exist: true}}, {appIdentifiers: {eq: $domain}}]}]}
    locale: $locale
  ) {
    items {
      _metadata {
        key
        displayName
      }
      copyright
      footerMenus {
        ...IContentData
        ...MenuNavigationBlockData
      }
      legalLinks {
        ...LinkItemData
      }
      contactInfoHeading
      contactInfo {
        json
      }
    }
  }
}
    ${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${MenuNavigationBlockDataFragmentDoc}
${LinkItemDataFragmentDoc}`;
export const getHeaderDataDocument = gql`
    query getHeaderData($domain: String, $locale: [Locales!]) {
  appLayout: LayoutSettingsBlock(
    where: {_or: [{appIdentifiers: {exist: false}}, {_and: [{appIdentifiers: {exist: true}}, {appIdentifiers: {eq: $domain}}]}]}
    locale: $locale
  ) {
    items {
      _metadata {
        key
        displayName
      }
      appIdentifiers
      mainMenu {
        ...IContentData
        ...MegaMenuGroupBlockData
      }
      serviceButtons {
        ...IContentData
        ...ButtonBlockData
      }
    }
  }
}
    ${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${MegaMenuGroupBlockDataFragmentDoc}
${MenuNavigationBlockDataFragmentDoc}
${LinkItemDataFragmentDoc}
${BlogPostPageMenuBlockFragmentDoc}
${ReferenceDataFragmentDoc}
${ButtonBlockDataFragmentDoc}`;
export const getLocalesDocument = gql`
    query getLocales {
  schema: __schema {
    types {
      kind
      name
      enumValues {
        name
      }
    }
  }
}
    `;
export const getArticlesDocument = gql`
    query getArticles($pageSize: Int! = 10, $start: Int! = 0, $locale: [Locales], $author: [String!], $published: Date, $publishedEnd: Date) {
  getArticles: BlogPostPage(
    where: {_and: [{_metadata: {published: {gte: $published}}}, {_metadata: {published: {lte: $publishedEnd}}}], _metadata: {status: {eq: "Published"}}}
    locale: $locale
    limit: $pageSize
    skip: $start
    orderBy: {_metadata: {published: DESC}}
  ) {
    total
    items {
      ...IContentData
      _metadata {
        status
        published
      }
      title: Heading
      description: SeoSettings {
        text: MetaDescription
      }
      author: ArticleAuthor
      image: BlogPostPromoImage {
        ...ReferenceData
      }
    }
    facets {
      author: ArticleAuthor(orderType: VALUE, orderBy: ASC, filters: $author) {
        count
        name
      }
      _metadata {
        published(unit: DAY) {
          count
          name
        }
      }
    }
  }
}
    ${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${ReferenceDataFragmentDoc}`;
export const searchContentDocument = gql`
    query searchContent($term: String!, $locale: [String!], $withinLocale: [Locales], $types: [String!], $pageSize: Int! = 25, $start: Int! = 0) {
  Content: _Page(
    where: {_fulltext: {match: $term}, _metadata: {url: {base: {exist: true}}}}
    orderBy: {_ranking: SEMANTIC}
    limit: $pageSize
    skip: $start
    locale: $withinLocale
  ) {
    total
    items {
      _score
      ...SearchData
      _metadata {
        published
      }
      preview: _fulltext(
        highlight: {enabled: true, startToken: "<span>", endToken: "</span>"}
      )
      ...BlogPostPageSearchResult
    }
    facets {
      _metadata {
        types(filters: $types) {
          name
          count
        }
        locale(filters: $locale) {
          name
          count
        }
      }
    }
  }
}
    ${SearchDataFragmentDoc}
${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${BlogPostPageSearchResultFragmentDoc}
${ReferenceDataFragmentDoc}`;
export const personalizedSearchContentDocument = gql`
    query personalizedSearchContent($term: String!, $topInterest: String, $locale: [String!], $withinLocale: [Locales], $types: [String!], $pageSize: Int! = 25, $start: Int! = 0, $boost: Int! = 100) {
  Content: _Page(
    where: {_or: [{_fulltext: {match: $term}}, {_fulltext: {match: $topInterest, boost: $boost}}], _metadata: {url: {base: {exist: true}}}}
    orderBy: {_ranking: SEMANTIC}
    limit: $pageSize
    skip: $start
    locale: $withinLocale
  ) {
    total
    items {
      _score
      ...SearchData
      _metadata {
        published
      }
      preview: _fulltext(
        highlight: {enabled: true, startToken: "<span>", endToken: "</span>"}
      )
      ...BlogPostPageSearchResult
    }
    facets {
      _metadata {
        types(filters: $types) {
          name
          count
        }
        locale(filters: $locale) {
          name
          count
        }
      }
    }
  }
}
    ${SearchDataFragmentDoc}
${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${BlogPostPageSearchResultFragmentDoc}
${ReferenceDataFragmentDoc}`;
export const getContentByIdDocument = gql`
    query getContentById($key: String!, $version: String, $locale: [Locales!], $path: String = "-", $domain: String, $changeset: String) {
  content: _Content(
    variation: {include: ALL}
    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {default: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}], _metadata: {changeset: {eq: $changeset}}}
    locale: $locale
  ) {
    total
    items: item {
      ...IContentData
      ...BlockData
      ...PageData
      ...ArticleListElementData
      ...BannerData
      ...ButtonBlockData
      ...CTAElementData
      ...CarouselBlockData
      ...ContentCarouselData
      ...ContentRecsElementData
      ...ContinueReadingComponentData
      ...HeadingElementData
      ...HeroBlockData
      ...ImageElementData
      ...LayoutSettingsBlockData
      ...MegaMenuGroupBlockData
      ...MenuNavigationBlockData
      ...OdpEmbedBlockData
      ...OptiFormsChoiceElementData
      ...OptiFormsSelectionElementData
      ...OptiFormsTextareaElementData
      ...OptiFormsTextboxElementData
      ...OptiFormsUrlElementData
      ...PageSeoSettingsData
      ...ParagraphElementData
      ...QuoteBlockData
      ...RichTextElementData
      ...TestimonialElementData
      ...TextBlockData
      ...VideoElementData
      ...shops_BenefitListItemData
      ...shops_BenefitListSectionData
      ...shops_CtaBannerData
      ...shops_FeatureGridData
      ...shops_FeatureGridItemData
      ...shops_HeadlineBandData
      ...shops_MediaSpotlightData
      ...BlankSectionData
      ...BlankExperienceData
      ...BlogSectionExperienceData
      ...BlogPostPageData
      ...LandingPageData
      ...StaticPageData
    }
  }
}
    ${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${BlockDataFragmentDoc}
${PageDataFragmentDoc}
${ArticleListElementDataFragmentDoc}
${BannerDataFragmentDoc}
${ButtonBlockDataFragmentDoc}
${CTAElementDataFragmentDoc}
${CarouselBlockDataFragmentDoc}
${IContentListItemFragmentDoc}
${ImageMediaComponentDataFragmentDoc}
${VideoMediaComponentDataFragmentDoc}
${ContentCarouselDataFragmentDoc}
${ContentRecsElementDataFragmentDoc}
${ContinueReadingComponentDataFragmentDoc}
${HeadingElementDataFragmentDoc}
${HeroBlockDataFragmentDoc}
${ImageElementDataFragmentDoc}
${ReferenceDataFragmentDoc}
${LayoutSettingsBlockDataFragmentDoc}
${LinkItemDataFragmentDoc}
${MegaMenuGroupBlockDataFragmentDoc}
${MenuNavigationBlockDataFragmentDoc}
${BlogPostPageMenuBlockFragmentDoc}
${OdpEmbedBlockDataFragmentDoc}
${OptiFormsChoiceElementDataFragmentDoc}
${OptiFormsSelectionElementDataFragmentDoc}
${OptiFormsTextareaElementDataFragmentDoc}
${OptiFormsTextboxElementDataFragmentDoc}
${OptiFormsUrlElementDataFragmentDoc}
${PageSeoSettingsDataFragmentDoc}
${ParagraphElementDataFragmentDoc}
${QuoteBlockDataFragmentDoc}
${RichTextElementDataFragmentDoc}
${TestimonialElementDataFragmentDoc}
${TextBlockDataFragmentDoc}
${VideoElementDataFragmentDoc}
${shops_BenefitListItemDataFragmentDoc}
${shops_BenefitListSectionDataFragmentDoc}
${shops_CtaBannerDataFragmentDoc}
${shops_FeatureGridDataFragmentDoc}
${shops_FeatureGridItemDataFragmentDoc}
${shops_HeadlineBandDataFragmentDoc}
${shops_MediaSpotlightDataFragmentDoc}
${BlankSectionDataFragmentDoc}
${BlankExperienceDataFragmentDoc}
${PageSeoSettingsPropertyDataFragmentDoc}
${ExperienceDataFragmentDoc}
${CompositionNodeDataFragmentDoc}
${CompositionComponentNodeDataFragmentDoc}
${ElementDataFragmentDoc}
${IElementDataFragmentDoc}
${BlogSectionExperienceDataFragmentDoc}
${BlogPostPageDataFragmentDoc}
${LandingPageDataFragmentDoc}
${StaticPageDataFragmentDoc}`;
export const getContentByPathDocument = gql`
    query getContentByPath($path: [String!]!, $locale: [Locales!], $siteId: String, $changeset: String = null) {
  content: _Content(
    where: {_metadata: {url: {default: {in: $path}, base: {eq: $siteId}}, changeset: {eq: $changeset}}}
    locale: $locale
  ) {
    total
    items: item {
      ...IContentData
      ...PageData
      ...BlankExperienceData
      ...BlogSectionExperienceData
      ...BlogPostPageData
      ...LandingPageData
      ...StaticPageData
    }
  }
}
    ${IContentDataFragmentDoc}
${IContentInfoFragmentDoc}
${LinkDataFragmentDoc}
${PageDataFragmentDoc}
${BlankExperienceDataFragmentDoc}
${PageSeoSettingsPropertyDataFragmentDoc}
${ReferenceDataFragmentDoc}
${ExperienceDataFragmentDoc}
${CompositionNodeDataFragmentDoc}
${CompositionComponentNodeDataFragmentDoc}
${BlockDataFragmentDoc}
${ElementDataFragmentDoc}
${IElementDataFragmentDoc}
${ArticleListElementDataFragmentDoc}
${BannerDataFragmentDoc}
${ButtonBlockDataFragmentDoc}
${CTAElementDataFragmentDoc}
${CarouselBlockDataFragmentDoc}
${IContentListItemFragmentDoc}
${ImageMediaComponentDataFragmentDoc}
${VideoMediaComponentDataFragmentDoc}
${ContentCarouselDataFragmentDoc}
${ContentRecsElementDataFragmentDoc}
${ContinueReadingComponentDataFragmentDoc}
${HeadingElementDataFragmentDoc}
${HeroBlockDataFragmentDoc}
${ImageElementDataFragmentDoc}
${LayoutSettingsBlockDataFragmentDoc}
${LinkItemDataFragmentDoc}
${MegaMenuGroupBlockDataFragmentDoc}
${MenuNavigationBlockDataFragmentDoc}
${BlogPostPageMenuBlockFragmentDoc}
${OdpEmbedBlockDataFragmentDoc}
${OptiFormsChoiceElementDataFragmentDoc}
${OptiFormsSelectionElementDataFragmentDoc}
${OptiFormsTextareaElementDataFragmentDoc}
${OptiFormsTextboxElementDataFragmentDoc}
${OptiFormsUrlElementDataFragmentDoc}
${PageSeoSettingsDataFragmentDoc}
${ParagraphElementDataFragmentDoc}
${QuoteBlockDataFragmentDoc}
${RichTextElementDataFragmentDoc}
${TestimonialElementDataFragmentDoc}
${TextBlockDataFragmentDoc}
${VideoElementDataFragmentDoc}
${shops_BenefitListItemDataFragmentDoc}
${shops_BenefitListSectionDataFragmentDoc}
${shops_CtaBannerDataFragmentDoc}
${shops_FeatureGridDataFragmentDoc}
${shops_FeatureGridItemDataFragmentDoc}
${shops_HeadlineBandDataFragmentDoc}
${shops_MediaSpotlightDataFragmentDoc}
${BlankSectionDataFragmentDoc}
${BlogSectionExperienceDataFragmentDoc}
${BlogPostPageDataFragmentDoc}
${LandingPageDataFragmentDoc}
${StaticPageDataFragmentDoc}`;
export const getContentTypeDocument = gql`
    query getContentType($key: String!, $version: String, $locale: [Locales!], $path: String = "-", $domain: String) {
  content: _Content(
    variation: {include: ALL}
    where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]}
    locale: $locale
  ) {
    total
    items: item {
      _metadata {
        types
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getArticleListElementItems(variables: Schema.getArticleListElementItemsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getArticleListElementItemsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getArticleListElementItemsQuery>({ document: getArticleListElementItemsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getArticleListElementItems', 'query', variables);
    },
    getDefaultArticleList(variables?: Schema.getDefaultArticleListQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getDefaultArticleListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getDefaultArticleListQuery>({ document: getDefaultArticleListDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getDefaultArticleList', 'query', variables);
    },
    getSharedContinueReading(variables?: Schema.getSharedContinueReadingQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getSharedContinueReadingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getSharedContinueReadingQuery>({ document: getSharedContinueReadingDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getSharedContinueReading', 'query', variables);
    },
    getBlankExperienceMetaData(variables: Schema.getBlankExperienceMetaDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getBlankExperienceMetaDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getBlankExperienceMetaDataQuery>({ document: getBlankExperienceMetaDataDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getBlankExperienceMetaData', 'query', variables);
    },
    getChildBlogPosts(variables: Schema.getChildBlogPostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getChildBlogPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getChildBlogPostsQuery>({ document: getChildBlogPostsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getChildBlogPosts', 'query', variables);
    },
    getBlogSectionExperienceMetaData(variables: Schema.getBlogSectionExperienceMetaDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getBlogSectionExperienceMetaDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getBlogSectionExperienceMetaDataQuery>({ document: getBlogSectionExperienceMetaDataDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getBlogSectionExperienceMetaData', 'query', variables);
    },
    getBlogPostPageMetaData(variables: Schema.getBlogPostPageMetaDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getBlogPostPageMetaDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getBlogPostPageMetaDataQuery>({ document: getBlogPostPageMetaDataDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getBlogPostPageMetaData', 'query', variables);
    },
    getLandingPageMetaData(variables: Schema.getLandingPageMetaDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getLandingPageMetaDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getLandingPageMetaDataQuery>({ document: getLandingPageMetaDataDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getLandingPageMetaData', 'query', variables);
    },
    getStaticPageMetaData(variables: Schema.getStaticPageMetaDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getStaticPageMetaDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getStaticPageMetaDataQuery>({ document: getStaticPageMetaDataDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getStaticPageMetaData', 'query', variables);
    },
    getFooterData(variables?: Schema.getFooterDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getFooterDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getFooterDataQuery>({ document: getFooterDataDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getFooterData', 'query', variables);
    },
    getHeaderData(variables?: Schema.getHeaderDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getHeaderDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getHeaderDataQuery>({ document: getHeaderDataDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getHeaderData', 'query', variables);
    },
    getLocales(variables?: Schema.getLocalesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getLocalesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getLocalesQuery>({ document: getLocalesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getLocales', 'query', variables);
    },
    getArticles(variables?: Schema.getArticlesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getArticlesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getArticlesQuery>({ document: getArticlesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getArticles', 'query', variables);
    },
    searchContent(variables: Schema.searchContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.searchContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.searchContentQuery>({ document: searchContentDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'searchContent', 'query', variables);
    },
    personalizedSearchContent(variables: Schema.personalizedSearchContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.personalizedSearchContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.personalizedSearchContentQuery>({ document: personalizedSearchContentDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'personalizedSearchContent', 'query', variables);
    },
    getContentById(variables: Schema.getContentByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getContentByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getContentByIdQuery>({ document: getContentByIdDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getContentById', 'query', variables);
    },
    getContentByPath(variables: Schema.getContentByPathQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getContentByPathQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getContentByPathQuery>({ document: getContentByPathDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getContentByPath', 'query', variables);
    },
    getContentType(variables: Schema.getContentTypeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Schema.getContentTypeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Schema.getContentTypeQuery>({ document: getContentTypeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getContentType', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;