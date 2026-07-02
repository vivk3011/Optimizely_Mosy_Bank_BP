// Auto generated dictionary
// @not-modified => When this line is removed, the "force" parameter of the CLI tool is required to overwrite this file
import { type ComponentTypeDictionary } from "@remkoj/optimizely-cms-react";
import VideoElementComponent from "./VideoElement";
import TextBlockComponent from "./TextBlock";
import OptiFormsTextboxElementComponent from "./OptiFormsTextboxElement";
import OptiFormsTextareaElementComponent from "./OptiFormsTextareaElement";
import OptiFormsUrlElementComponent from "./OptiFormsUrlElement";
import OptiFormsChoiceElementComponent from "./OptiFormsChoiceElement";
import OptiFormsSelectionElementComponent from "./OptiFormsSelectionElement";
import TestimonialElementComponent from "./TestimonialElement";
import RichTextElementComponent from "./RichTextElement";
import QuoteBlockComponent from "./QuoteBlock";
import ParagraphElementComponent from "./ParagraphElement";
import PageSeoSettingsComponent from "./PageSeoSettings";
import OdpEmbedBlockComponent from "./OdpEmbedBlock";
import MenuNavigationBlockComponent from "./MenuNavigationBlock";
import MegaMenuGroupBlockMobileComponent from "./MegaMenuGroupBlock/mobile";
import MegaMenuGroupBlockComponent from "./MegaMenuGroupBlock";
import LayoutSettingsBlockComponent from "./LayoutSettingsBlock";
import ImageElementComponent from "./ImageElement";
import HeroBlockComponent from "./HeroBlock";
import BannerBlockComponent from "./BannerBlock";
import HeadingElementComponent from "./HeadingElement";
import ContinueReadingComponentComponent from "./ContinueReadingComponent";
import ContentRecsElementComponent from "./ContentRecsElement";
import CarouselBlockComponent from "./CarouselBlock";
import CTAElementComponent from "./CTAElement";
import ButtonBlockComponent from "./ButtonBlock";
import ArticleListElementComponent from "./ArticleListElement";
import ArticleListElementLoader from "./ArticleListElement/loading";
import ContentCarouselComponent from "./ContentCarousel";
import ShopsHeadlineBandComponent from "./shops_HeadlineBand";
import ShopsMediaSpotlightComponent from "./shops_MediaSpotlight";
import ShopsFeatureGridComponent from "./shops_FeatureGrid";
import ShopsFeatureGridItemComponent from "./shops_FeatureGridItem";
import ShopsBenefitListSectionComponent from "./shops_BenefitListSection";
import ShopsBenefitListItemComponent from "./shops_BenefitListItem";
import ShopsCtaBannerComponent from "./shops_CtaBanner";
import ComponentPageFactory from "./Page";

// Prefix entries - if needed
prefixDictionaryEntries(ComponentPageFactory, "Page");

// Build dictionary
export const ComponentFactory : ComponentTypeDictionary = [
    { 
        type: "VideoElement", 
        component: VideoElementComponent 
    },
    { 
        type: "TextBlock", 
        component: TextBlockComponent 
    },
    {
        type: "OptiFormsTextboxElement",
        component: OptiFormsTextboxElementComponent
    },
    {
        type: "OptiFormsTextareaElement",
        component: OptiFormsTextareaElementComponent
    },
    {
        type: "OptiFormsUrlElement",
        component: OptiFormsUrlElementComponent
    },
    {
        type: "OptiFormsChoiceElement",
        component: OptiFormsChoiceElementComponent
    },
    {
        type: "OptiFormsSelectionElement",
        component: OptiFormsSelectionElementComponent
    },
    { 
        type: "TestimonialElement", 
        component: TestimonialElementComponent 
    },
    { 
        type: "RichTextElement", 
        component: RichTextElementComponent 
    },
    { 
        type: "QuoteBlock", 
        component: QuoteBlockComponent 
    },
    { 
        type: "ParagraphElement", 
        component: ParagraphElementComponent 
    },
    { 
        type: "PageSeoSettings", 
        component: PageSeoSettingsComponent 
    },
    { 
        type: "OdpEmbedBlock", 
        component: OdpEmbedBlockComponent 
    },
    { 
        type: "MenuNavigationBlock", 
        component: MenuNavigationBlockComponent 
    },
    {
        type: "MenuNavigationBlock/menu",
        component: MenuNavigationBlockComponent
    },
    {
        type: "MenuNavigationBlock/footer",
        component: MenuNavigationBlockComponent
    },
    { 
        type: "MegaMenuGroupBlock/mobile", 
        component: MegaMenuGroupBlockMobileComponent 
    },
    { 
        type: "MegaMenuGroupBlock", 
        component: MegaMenuGroupBlockComponent 
    },
    { 
        type: "LayoutSettingsBlock", 
        component: LayoutSettingsBlockComponent 
    },
    { 
        type: "ImageElement", 
        component: ImageElementComponent 
    },
    { 
        type: "HeroBlock", 
        component: HeroBlockComponent 
    },
    {
        type: "Banner",
        component: BannerBlockComponent
    },
    {
        type: "BannerBlock",
        component: BannerBlockComponent
    },
    { 
        type: "HeadingElement", 
        component: HeadingElementComponent 
    },
    { 
        type: "ContinueReadingComponent", 
        component: ContinueReadingComponentComponent 
    },
    { 
        type: "ContentRecsElement", 
        component: ContentRecsElementComponent 
    },
    { 
        type: "CarouselBlock", 
        component: CarouselBlockComponent 
    },
    { 
        type: "CTAElement", 
        component: CTAElementComponent 
    },
    { 
        type: "ButtonBlock", 
        component: ButtonBlockComponent 
    },
    {
        type: "ButtonBlock/mobile",
        component: ButtonBlockComponent
    },
    { 
        type: "ArticleListElement", 
        component: ArticleListElementComponent,
        useSuspense: true,
        loader: ArticleListElementLoader
    },
    {
        type: "ContentCarousel",
        component: ContentCarouselComponent
    },
    {
        type: "shops_HeadlineBand",
        component: ShopsHeadlineBandComponent
    },
    {
        type: "shops_MediaSpotlight",
        component: ShopsMediaSpotlightComponent
    },
    {
        type: "shops_FeatureGrid",
        component: ShopsFeatureGridComponent
    },
    {
        type: "shops_FeatureGridItem",
        component: ShopsFeatureGridItemComponent
    },
    {
        type: "shops_BenefitListSection",
        component: ShopsBenefitListSectionComponent
    },
    {
        type: "shops_BenefitListItem",
        component: ShopsBenefitListItemComponent
    },
    {
        type: "shops_CtaBanner",
        component: ShopsCtaBannerComponent
    },
    ...ComponentPageFactory
];

// Export dictionary
export default ComponentFactory;

// Helper functions
function prefixDictionaryEntries(list: ComponentTypeDictionary, prefix: string) : ComponentTypeDictionary
{
    list.forEach((component, idx, dictionary) => {
        dictionary[idx].type = typeof component.type == 'string' ? prefix + "/" + component.type : [ prefix, ...component.type ]
    });
    return list;
}
