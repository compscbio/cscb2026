# Homework 4

!!!warning "*Do you believe in fate, Neo?*"

     **Deadline: Monday, April 6th 2026 11:59pm**

    ![fate](img/fate.png){ align=right style="max-width:45%; margin:0 0 0.5em 1em;" }

    The overall goal of this homework is for you to gain experience in using [trajectory inference](../glossary.md#trajectory-inference) (TI) and cell fate [potency](../glossary.md#potency) methods.

### Background

[**Gastrulation**](../glossary.md#gastrulation) marks the point during embryonic development at which some [pluripotent](../glossary.md#pluripotent) [epiblast](../glossary.md#epiblast) cells commit to endoderm or [mesoderm](../glossary.md#mesoderm) fates. Gastrulation initiates with posterior epiblast cells undergoing an [**epithelial-to-mesenchymal transition**](../glossary.md#epithelial-to-mesenchymal-transition-emt) (EMT). These cells delaminate, ingress through, and ultimately migrate away from, the [**primitive streak**](../glossary.md#primitive-streak).  The fate of many embryonic cells and their progeny are determined by where and when they undergo this process. In general, cells located anteriorly and that delaminate early during gastrulation (i.e. [**anterior primitive streak**](../glossary.md#anterior-primitive-streak) or APS) are fated to become [**definitive endoderm**](../glossary.md#definitive-endoderm) (DE) cells. Cells that delaminate later and are located more posteriorly are generally fated to become mesoderm lineage cells.

We have provided a scRNA-seq data set from mouse embryos at the gastrula-stage as described in the [Data section](#data). In brief, it consists of epiblast cells, nascent mesoderm, anterior primitive streak, and [visceral endoderm](../glossary.md#visceral-endoderm) cells from E6.5 to E8.5 stage mouse embryos. Starting at E6.5, some epiblast cells will undergo the processes described above, and they will ultimately give rise to definitive endoderm or mesoderm cells. However, visceral endoderm cells are specified earlier in development and are not derived from the epiblast cells present in this data set.

!!!danger "TI pitfalls"

	1. TI analysis typically assumes that the input cells _are_ developmentally interlinked. Even when data violate this assumption, most TI methods will still try to link them purely on the basis of transcriptional similarity. This is bad. 
	2. TI analysis also typically requires the user to input a start point or 'root' of a trajectory. 

### Task 1: Perform cell-typing

Before you can reliably apply TI to this data, you must perform cell-typing to (A) identify and exclude VE cells, and (B) to identify the epiblast, mesoderm, and anterior primitive streak cells. This will allow you to suggest a root for the TI analysis. To help you with this part, here are some well-established marker genes:

- Epiblast: Utf1, Slc7a3, Pou3f1
- Mesoderm: Mesp1, Fgf3, Snai1
- Anterior primitive streak: Foxa2, Gsc, Sox17
- Visceral endoderm: Use your highly refined literature-mining skills to find these. As a starting point, *Ttr* is a well-known VE marker. Please select 2-4 additional genes that are reported to be VE-specific from the literature. You must cite the primary papers in which each gene has been demonstrated to be a marker of murine VE.

You will know that you are done with Task 1 when you have clearly annotated each cell and have excluded the VE cells from the input data.

### Task 2: Infer trajectory and pseudotime

Use [scFates](../glossary.md#scfates) to reconstruct a trajectory that connects epiblast to APS, and epiblast to mesoderm. Then predict the [pseudotime](../glossary.md#pseudotime) for each cell. To receive full credit for Task 2, you must infer the tree, justify your parameter selections, and visualize the resulting tree with labeled branches and milestones, and visualize pseudotime.

!!!tip "Parameters to discuss"

	Key parameters to justify include the number of principal points used to fit the tree, the root node selection, and the number of principal components used as input to the principal graph.

### Task 2b: Validate the trajectory with biological priors

The data include cells from embryonic stages E6.5, E7.5, and E8.5. Overlay the embryonic stage labels on your pseudotime ordering (e.g., plot pseudotime colored or grouped by stage). Is the pseudotime ordering consistent with actual developmental time? Where does it agree and where does it disagree? Use this analysis to assess the biological plausibility of your inferred trajectory.

### Task 3: Discover regulators of differentiation

What transcription factors might promote the transition from epiblast to mesoderm or to endoderm? Develop criteria for ranking transcription factors (TFs) according to their predicted importance or influence on differentiation. At minimum, use scFates's `tl.test_association` to identify genes significantly associated with each branch, and then filter results to the provided TF list. You may also conceive of additional criteria to further refine your ranking (e.g., fold change, branch specificity). Use these criteria to select the top X TFs (where X > 4) that specifically promote mesoderm or endoderm differentiation from the epiblast. Mine the literature around each of your candidate TFs to assess the extent to which your criteria and application of scFates recovered bona fide regulators of gastrulation. Your answer should cite the primary papers that you use here. You must have two separate sets of X candidate TFs: one for mesoderm differentiation, and one for endoderm differentiation.

### Task 4: Discover regulators of pluripotency

What transcription factors potentially oppose epiblast differentiation, and thus promote pluripotency? Perform a similar analysis to Task 3, but now look for TFs whose expression *decreases* along the differentiation pseudotime — i.e., TFs that are highly expressed in epiblast cells near the root and are downregulated as cells commit to mesoderm or endoderm fates. Identify the top X candidate pluripotency-promoting TFs and validate them against the literature as in Task 3.

### Task 5: Compare CytoTRACE to pseudotime

To what extent do [CytoTRACE](../glossary.md#cytotrace) and scFates pseudotime agree? Compute CytoTRACE's cell potency score on this data and compute its correlation with scFates pseudotime. Do they agree? If not, perform further analyses to explore why this might be the case. For example, consider whether the disagreement is specific to certain cell populations or branches of the trajectory, and whether the two methods are measuring fundamentally different properties.

Additionally, visualize CytoTRACE scores on your UMAP, colored by CytoTRACE score and also colored by cell type. Does the CytoTRACE potency gradient follow the expected pattern — i.e., are epiblast cells scored as more potent than APS and mesoderm cells? Compare this visual to pseudotime plotted on the same UMAP. Where do the two measures paint the same picture, and where do they diverge?

### Data
#### scRNA-seq data of mouse gastrulation embryonic cells
- [adHW4_2026.h5ad](https://jhu.instructure.com/courses/112401/files/folder/data?preview=17537906)
- Includes only VE, APS, nascent mesoderm, and epiblast cells
- We have already performed cell quality control. You will want to perform gene quality control and standard downstream processing.
- There should be roughly equivalent numbers of cells per population.

#### List of mouse transcription factors:
- [mouse_tfs_aertslab.txt](https://jhu.instructure.com/courses/112401/files/folder/data?preview=17537930)

